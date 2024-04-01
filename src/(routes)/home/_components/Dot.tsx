import { Dispatch, SetStateAction } from 'react';

interface IDotProps {
    isActive: boolean;
    dotSize: number;
    idx: number;
    setSlideIdx: Dispatch<SetStateAction<number>>;
}

type dotSizeType = {
    [key: number]: string;
};

const dotShape: dotSizeType = {
    0: 'h-2 w-2',
    1: 'h-2 w-4',
};

export default function Dot({ isActive, dotSize, idx, setSlideIdx }: IDotProps) {
    const moveDot = (index: number) => {
        setSlideIdx(index);
    };

    return (
        <div
            onClick={() => moveDot(idx)}
            className={`m-2 ${dotShape[dotSize]} cursor-pointer 
            rounded-full shadow-sm ${isActive ? 'bg-primary' : 'bg-gray-100'}`}
        />
    );
}
