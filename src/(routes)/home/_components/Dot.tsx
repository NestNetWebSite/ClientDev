import { Dispatch, SetStateAction } from 'react';

interface IDotProps {
    isActive: boolean;
    idx: number;
    setSlideIdx: Dispatch<SetStateAction<number>>;
}

export default function Dot({ isActive, idx, setSlideIdx }: IDotProps) {
    const moveDot = (index: number) => {
        setSlideIdx(index);
    };

    return (
        <div
            onClick={() => moveDot(idx)}
            className={`m-2 h-2 w-2 cursor-pointer rounded-full shadow-sm ${isActive ? 'bg-primary' : 'bg-gray-100'}`}
        />
    );
}
