import { useState, useRef, useCallback } from 'react';
import type { CommentInput } from '@/types/comment';

interface UseCommentFormProps {
  onSubmit: (comment: CommentInput) => void;
}

export const useCommentForm = ({ onSubmit }: UseCommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustTextareaHeight();
  };

  const canSubmit = !!(author.trim() && content.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmit({ author: author.trim(), content: content.trim() });
    setAuthor('');
    setContent('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return {
    author,
    setAuthor,
    content,
    textareaRef,
    canSubmit,
    handleContentChange,
    handleSubmit,
  };
};
