/* eslint-disable */
// @ts-nocheck
import React, { useRef, useState } from 'react';
import { colorSyntax, codeSyntaxHighlight, Prism } from '~/styles/toast-ui';
import { onUploadImage } from '~/api/board';

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

export const resizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      // 원본 비율 유지하면서 크기 조정
      let width = img.width;
      let height = img.height;

      // 최대 크기를 1920x1080으로 제한
      if (width > 1920) {
        height = Math.round((height * 1920) / width);
        width = 1920;
      }
      if (height > 1080) {
        width = Math.round((width * 1080) / height);
        height = 1080;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob conversion failed'));
        },
        'image/jpeg',
        0.7,
      );
    };

    img.onerror = () => reject(new Error('Image load failed'));

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const useMarkdownEditor = ({
  initialContent = ' ',
  onContentChange,
}: UseMarkdownEditorProps = {}): UseMarkdownEditorReturn => {
  const editorRef = useRef<any>();
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

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
      setIsUploading(true);
      const shouldResize = blob.size > 1024 * 512;

      let processedBlob: File | Blob = blob;
      if (shouldResize) {
        processedBlob = await resizeImage(blob);
      }

      const url = await onUploadImage(processedBlob);
      callback(url);
      setIsUploading(false);
      return url;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      setError('이미지 업로드에 실패했습니다.');
      setIsUploading(false);
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
    isUploading,
    handleEditorChange,
    validateContent,
    editorConfig,
  };
};
