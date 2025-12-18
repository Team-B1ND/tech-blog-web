import styled from "styled-components";
import {Skeleton} from "@/skeletons/Skeleton.tsx";

export const PopularSkeleton = () => (
	<>
		{Array.from({ length: 5 }).map((_, i) => (
			<SkeletonItem key={i}>
				<SkeletonTitle/>
				<SkeletonViews />
			</SkeletonItem>
		))}
	</>
);

const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const SkeletonTitle = styled(Skeleton)`
  height: 16px;
`;

const SkeletonViews = styled(Skeleton)`
  height: 12px;
  width: 50px;
`;