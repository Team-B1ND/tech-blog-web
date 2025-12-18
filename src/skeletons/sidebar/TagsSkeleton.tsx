import styled from "styled-components";
import {Skeleton} from "@/skeletons/Skeleton.tsx";

export const TagsSkeleton = () => (
	<TagList>
		{Array.from({ length: 8 }).map((_, i) => (
			<SkeletonTag key={i}/>
		))}
	</TagList>
);

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkeletonTag = styled(Skeleton)`
  height: 24px;
	width: 75px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;