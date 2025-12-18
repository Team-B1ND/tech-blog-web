import styled from "styled-components";
import {Skeleton} from "@/skeletons/Skeleton.tsx";

export const SearchSkeleton = () => {
	return (
		<>
			{[1, 2, 3].map((i) => (
				<SkeletonItem key={i}>
					<SkeletonCategory />
					<SkeletonTitle />
					<SkeletonMeta />
				</SkeletonItem>
			))}
		</>
	)
}

const SkeletonItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const SkeletonCategory = styled(Skeleton)`
  width: 60px;
  height: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SkeletonTitle = styled(Skeleton)`
  width: 80%;
  height: 18px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SkeletonMeta = styled(Skeleton)`
  width: 40%;
  height: 14px;
`;
