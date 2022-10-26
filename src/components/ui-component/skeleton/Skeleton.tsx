import {FC} from 'react';
import {Skeleton as SkeletonUI} from '@mui/material';

interface SkeletonProps {
    height?: number;
    width?: number;
}

export const Skeleton: FC<SkeletonProps> = ({height, width}) => {
    return (
        <SkeletonUI
            animation="wave"
            variant="rectangular"
            height={height}
            width={width}
        />
    );
};
