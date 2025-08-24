/* eslint-disable */
// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';

import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
import { onUploadImage } from '~/api/board';

interface UseMarkdownEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  onImageUpload?: (imageUrl: string) => void;
}

interface UseMarkdownEditorReturn {
  editorRef: React.RefObject<any>;
  content: string;
  error: string | undefined;
  handleEditorChange: () => void;
  validateContent: () => boolean;
  editorConfig: {
    initialValue: string;
    previewStyle: string;
    height: string;
    initialEditType: string;
    useCommandShortcut: boolean;
    plugins: any[];
    onChange: () => void;
    hooks: {
      addImageBlobHook: (
        _blob: File,
        _callback: (_url: string) => void,
      ) => Promise<void>;
    };
  };
}

export const useMarkdownEditor = ({
  initialContent = ' ',
  onContentChange,
  onImageUpload,
}: UseMarkdownEditorProps = {}): UseMarkdownEditorReturn => {
  const editorRef = useRef<any>();
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string>();

  useEffect(() => {
    // Toast UI 에디터가 마운트된 후에 스타일 적용
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .toastui-editor-popup-body li {
        display: block !important;
      }
      
      .toastui-editor-contents ol li, 
      .toastui-editor-contents ul li {
        display: list-item !important;
      }
      
      .toastui-editor-md-preview ol li, 
      .toastui-editor-md-preview ul li {
        display: list-item !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      // 컴포넌트 언마운트 시 제거
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleEditorChange = () => {
    const newContent = editorRef.current?.getInstance().getMarkdown();
    setContent(newContent);
    setError(undefined);
    onContentChange?.(newContent);
  };

  const validateContent = () => {
    const currentContent = editorRef.current?.getInstance().getMarkdown();
    if (!currentContent?.trim()) {
      setError('내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleImageUpload = async (
    blob: File,
    callback: (_url: string) => void,
  ) => {
    try {
      const url = await onUploadImage(blob);
      callback(url);
      // 부모 컴포넌트에 이미지 URL 전달
      if (onImageUpload) {
        onImageUpload(url);
      }
      return url;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const editorConfig = {
    initialValue: initialContent,
    previewStyle: 'vertical',
    height: '600px',
    initialEditType: 'wysiwyg',
    useCommandShortcut: true,
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax],
    onChange: handleEditorChange,
    hooks: {
      addImageBlobHook: handleImageUpload,
    },
  };

  return {
    editorRef,
    content,
    error,
    handleEditorChange,
    validateContent,
    editorConfig,
  };
};
