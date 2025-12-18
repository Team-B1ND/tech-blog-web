import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApiCategory } from '@/libs/api/types';
import type { Author } from '@/components/write/AuthorSelector';
import { useCreateArticle } from '@/api';

export const useWriteForm = (currentUser: Author) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState<Author[]>([currentUser]);
  const [category, setCategory] = useState<ApiCategory>('DEVELOPMENT');
  const [tags, setTags] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [content, setContent] = useState('');

  const createArticle = useCreateArticle();

  const canSubmit = !!(
    title.trim() &&
    authors.length > 0 &&
    content.trim() &&
    thumbnailFile &&
    !createArticle.isPending
  );

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const triggerThumbnailUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !thumbnailFile) return;

    const articleData = {
      title: title.trim(),
      authorIds: authors.map((a) => a.id),
      content,
      category,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const result = await createArticle.mutateAsync({
        article: articleData,
        thumbnail: thumbnailFile,
      });
      alert('글이 작성되었습니다!');
      navigate(`/article/${result.id}`);
    } catch (err) {
      console.error('Failed to create article:', err);
      alert('글 작성에 실패했습니다.');
    }
  };

  return {
    fileInputRef,
    title,
    setTitle,
    authors,
    setAuthors,
    category,
    setCategory,
    tags,
    setTags,
    thumbnailPreview,
    content,
    setContent,
    canSubmit,
    isPending: createArticle.isPending,
    handleThumbnailUpload,
    clearThumbnail,
    triggerThumbnailUpload,
    handleSubmit,
  };
};
