import { ReactNode } from 'react';

interface IProps {
    isBtnDisabled?: boolean;
    content: string | ReactNode;
}

export default function OvalButton({ isBtnDisabled, content }: IProps) {
    return (
        <button
            disabled={isBtnDisabled}
            className={`h-[3rem] w-[5rem] rounded-3xl bg-primary px-4 py-3 
                text-lg font-bold text-white duration-150 
                ${isBtnDisabled ? 'cursor-default' : 'opacity-100'}`}
        >
            {content}
        </button>
    );
}
