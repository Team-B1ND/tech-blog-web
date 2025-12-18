import { useCallback, useRef, useState, useEffect } from 'react';
import type { ToolbarAction } from '@/components/write/MarkdownToolbar';

export const useMarkdownEditor = (
  content: string,
  setContent: (content: string) => void
) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const insertText = useCallback((before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newText = content.substring(0, start) + before + textToInsert + after + content.substring(end);

    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText
        ? start + before.length + textToInsert.length + after.length
        : start + before.length;
      textarea.setSelectionRange(
        selectedText ? newCursorPos : newCursorPos,
        selectedText ? newCursorPos : newCursorPos + placeholder.length
      );
    }, 0);
  }, [content, setContent]);

  const insertAtCursor = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = content.substring(0, start) + text + content.substring(start);

    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + text.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [content, setContent]);

  const handleToolbarAction = useCallback((action: ToolbarAction) => {
    switch (action) {
      case 'bold':
        insertText('**', '**', '굵은 텍스트');
        break;
      case 'italic':
        insertText('*', '*', '기울임 텍스트');
        break;
      case 'strikethrough':
        insertText('~~', '~~', '취소선 텍스트');
        break;
      case 'h1':
        insertText('# ', '', '제목 1');
        break;
      case 'h2':
        insertText('## ', '', '제목 2');
        break;
      case 'h3':
        insertText('### ', '', '제목 3');
        break;
      case 'ul':
        insertText('- ', '', '목록 항목');
        break;
      case 'ol':
        insertText('1. ', '', '목록 항목');
        break;
      case 'quote':
        insertText('> ', '', '인용구');
        break;
      case 'code':
        insertText('`', '`', '코드');
        break;
      case 'codeblock':
        insertText('```\n', '\n```', '코드를 입력하세요');
        break;
      case 'link':
        insertText('[', '](url)', '링크 텍스트');
        break;
      case 'table':
        insertAtCursor('\n| 헤더 1 | 헤더 2 | 헤더 3 |\n|--------|--------|--------|\n| 내용 1 | 내용 2 | 내용 3 |\n| 내용 4 | 내용 5 | 내용 6 |\n');
        break;
    }
  }, [insertText, insertAtCursor]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    // TODO: Replace with actual API call to POST /upload/image
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      insertAtCursor(`![이미지](${imageUrl})\n`);
      setIsUploadingImage(false);
    };
    reader.onerror = () => {
      alert('이미지 업로드에 실패했습니다.');
      setIsUploadingImage(false);
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  }, [insertAtCursor]);

  const triggerImageUpload = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;

      if (isMod && e.key === 'b') {
        e.preventDefault();
        handleToolbarAction('bold');
      } else if (isMod && e.key === 'i') {
        e.preventDefault();
        handleToolbarAction('italic');
      } else if (isMod && e.key === 'k') {
        e.preventDefault();
        handleToolbarAction('link');
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    return () => textarea.removeEventListener('keydown', handleKeyDown);
  }, [handleToolbarAction]);

  return {
    textareaRef,
    imageInputRef,
    isUploadingImage,
    handleToolbarAction,
    handleImageUpload,
    triggerImageUpload,
  };
};
