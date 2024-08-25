import { Dispatch, SetStateAction } from 'react';

type dotSizeType = {
    [key: string]: string;
};
const dotShape: dotSizeType = {
    circle: 'h-2 w-2', // 원형
    pill: 'h-2 w-4', // 알약형
};

// 인덱스 닷 버튼 (슬라이딩 배너를 조작하는 버튼)
interface IDotProps {
    isActive: boolean;
    shape: keyof typeof dotShape;
    idx: number;
    setSlideIdx: Dispatch<SetStateAction<number>>;
}
export default function Dot({ isActive, shape, idx, setSlideIdx }: IDotProps) {
    const onDotClick = (index: number) => {
        setSlideIdx(index);
    };

    return (
        <div
            onClick={() => onDotClick(idx)}
            className={`m-2 ${dotShape[shape]} cursor-pointer
            rounded-full shadow-sm ${isActive ? 'bg-primary' : 'bg-gray-100'}`}
        />
    );
}
