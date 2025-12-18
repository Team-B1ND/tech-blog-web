import styled from 'styled-components';
import BoldIcon from '@/assets/icons/bold.svg?react';
import ItalicIcon from '@/assets/icons/italic.svg?react';
import StrikethroughIcon from '@/assets/icons/strikethrough.svg?react';
import ListBulletIcon from '@/assets/icons/list-bullet.svg?react';
import ListNumberIcon from '@/assets/icons/list-number.svg?react';
import QuoteIcon from '@/assets/icons/quote.svg?react';
import CodeIcon from '@/assets/icons/code.svg?react';
import CodeblockIcon from '@/assets/icons/codeblock.svg?react';
import LinkIcon from '@/assets/icons/link-md.svg?react';
import ImageIcon from '@/assets/icons/image-md.svg?react';
import TableIcon from '@/assets/icons/table.svg?react';

interface MarkdownToolbarProps {
  onInsert: (type: ToolbarAction) => void;
  onImageUpload: () => void;
  isUploading?: boolean;
}

export type ToolbarAction =
  | 'bold'
  | 'italic'
  | 'strikethrough'
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
    icon: <BoldIcon />,
  },
  {
    action: 'italic',
    title: '기울임 (Ctrl+I)',
    icon: <ItalicIcon />,
  },
  {
    action: 'strikethrough',
    title: '취소선',
    icon: <StrikethroughIcon />,
  },
  {
    action: 'ul',
    title: '글머리 기호 목록',
    icon: <ListBulletIcon />,
  },
  {
    action: 'ol',
    title: '번호 매기기 목록',
    icon: <ListNumberIcon />,
  },
  {
    action: 'quote',
    title: '인용구',
    icon: <QuoteIcon />,
  },
  {
    action: 'code',
    title: '인라인 코드',
    icon: <CodeIcon />,
  },
  {
    action: 'codeblock',
    title: '코드 블록',
    icon: <CodeblockIcon />,
  },
  {
    action: 'link',
    title: '링크 (Ctrl+K)',
    icon: <LinkIcon />,
  },
  {
    action: 'image',
    title: '이미지 업로드',
    icon: <ImageIcon />,
  },
  {
    action: 'table',
    title: '테이블',
    icon: <TableIcon />,
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
        {buttons.slice(6, 8).map((btn) => (
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
        {buttons.slice(8).map((btn) => (
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
