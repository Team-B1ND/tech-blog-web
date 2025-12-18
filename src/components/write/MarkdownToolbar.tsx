import styled from 'styled-components';

interface MarkdownToolbarProps {
  onInsert: (type: ToolbarAction) => void;
  onImageUpload: () => void;
  isUploading?: boolean;
}

export type ToolbarAction =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'ul'
  | 'ol'
  | 'quote'
  | 'code'
  | 'codeblock'
  | 'link'
  | 'table';

interface ToolbarButton {
  action: ToolbarAction | 'image';
  icon: React.ReactNode;
  title: string;
}

const buttons: ToolbarButton[] = [
  {
    action: 'bold',
    title: '굵게 (Ctrl+B)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>,
  },
  {
    action: 'italic',
    title: '기울임 (Ctrl+I)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>,
  },
  {
    action: 'strikethrough',
    title: '취소선',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>,
  },
  {
    action: 'h1',
    title: '제목 1',
    icon: <span style={{ fontWeight: 700, fontSize: '14px' }}>H1</span>,
  },
  {
    action: 'h2',
    title: '제목 2',
    icon: <span style={{ fontWeight: 700, fontSize: '13px' }}>H2</span>,
  },
  {
    action: 'h3',
    title: '제목 3',
    icon: <span style={{ fontWeight: 700, fontSize: '12px' }}>H3</span>,
  },
  {
    action: 'ul',
    title: '글머리 기호 목록',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>,
  },
  {
    action: 'ol',
    title: '번호 매기기 목록',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>,
  },
  {
    action: 'quote',
    title: '인용구',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>,
  },
  {
    action: 'code',
    title: '인라인 코드',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  },
  {
    action: 'codeblock',
    title: '코드 블록',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  },
  {
    action: 'link',
    title: '링크 (Ctrl+K)',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>,
  },
  {
    action: 'image',
    title: '이미지 업로드',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
  },
  {
    action: 'table',
    title: '테이블',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 5h3v3H5V5zm5 14h-2v-3h2v3zm0-5h-2v-3h2v3zm0-5H8V6h2v3zm5 10h-3v-3h3v3zm0-5h-3v-3h3v3zm0-5h-3V6h3v3zm5 10h-3v-3h3v3zm0-5h-3v-3h3v3zm0-5h-3V6h3v3z"/></svg>,
  },
];

export const MarkdownToolbar = ({ onInsert, onImageUpload, isUploading }: MarkdownToolbarProps) => {
  const handleClick = (action: ToolbarAction | 'image') => {
    if (action === 'image') {
      onImageUpload();
    } else {
      onInsert(action);
    }
  };

  return (
    <Toolbar>
      <ButtonGroup>
        {buttons.slice(0, 3).map((btn) => (
          <ToolbarBtn
            key={btn.action}
            type="button"
            title={btn.title}
            onClick={() => handleClick(btn.action)}
            disabled={isUploading}
          >
            {btn.icon}
          </ToolbarBtn>
        ))}
      </ButtonGroup>
      <Divider />
      <ButtonGroup>
        {buttons.slice(3, 6).map((btn) => (
          <ToolbarBtn
            key={btn.action}
            type="button"
            title={btn.title}
            onClick={() => handleClick(btn.action)}
            disabled={isUploading}
          >
            {btn.icon}
          </ToolbarBtn>
        ))}
      </ButtonGroup>
      <Divider />
      <ButtonGroup>
        {buttons.slice(6, 9).map((btn) => (
          <ToolbarBtn
            key={btn.action}
            type="button"
            title={btn.title}
            onClick={() => handleClick(btn.action)}
            disabled={isUploading}
          >
            {btn.icon}
          </ToolbarBtn>
        ))}
      </ButtonGroup>
      <Divider />
      <ButtonGroup>
        {buttons.slice(9, 11).map((btn) => (
          <ToolbarBtn
            key={btn.action}
            type="button"
            title={btn.title}
            onClick={() => handleClick(btn.action)}
            disabled={isUploading}
          >
            {btn.icon}
          </ToolbarBtn>
        ))}
      </ButtonGroup>
      <Divider />
      <ButtonGroup>
        {buttons.slice(11).map((btn) => (
          <ToolbarBtn
            key={btn.action}
            type="button"
            title={btn.title}
            onClick={() => handleClick(btn.action)}
            disabled={btn.action === 'image' && isUploading}
          >
            {btn.action === 'image' && isUploading ? (
              <LoadingSpinner />
            ) : (
              btn.icon
            )}
          </ToolbarBtn>
        ))}
      </ButtonGroup>
    </Toolbar>
  );
};

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.categoryBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0 ${({ theme }) => theme.spacing.xs};
`;

const ToolbarBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
