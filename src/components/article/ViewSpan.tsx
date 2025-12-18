import styled from "styled-components";

interface ViewSpanProps {
	views: number;
}

export const ViewSpan = ({views}: ViewSpanProps) => {
	return (
		<Views>
			<EyeIcon width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
				<circle cx="12" cy="12" r="3" />
			</EyeIcon>
			{views.toLocaleString()}
		</Views>
	)
}


const Views = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const EyeIcon = styled.svg`
  flex-shrink: 0;
`;