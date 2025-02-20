/* eslint-disable */
// @ts-nocheck
import React, { useRef, useState } from 'react';

import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
// import { onUploadImage } from '~/api/board';

interface UseMarkdownEditorProps {
  initialContent?: string;
  onContentChange?: (_content: string) => void;
}

interface UseMarkdownEditorReturn {
  editorRef: React.RefObject<any>;
  content: string;
  error?: string;
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
}: UseMarkdownEditorProps = {}): UseMarkdownEditorReturn => {
  const editorRef = useRef<any>();
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string>();

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
      addImageBlobHook: async () => {},
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
