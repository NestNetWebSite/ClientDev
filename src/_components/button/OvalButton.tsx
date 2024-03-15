interface IProps {
    isBtnDisabled?: boolean;
    content: string;
}

export default function OvalButton({ isBtnDisabled, content }: IProps) {
    return (
        <button
            disabled={isBtnDisabled}
            className={`rounded-3xl bg-primary px-4 py-3 text-lg font-bold text-white duration-150 ${
                isBtnDisabled ? 'cursor-default' : 'opacity-100'
            }`}
        >
            {content}
        </button>
    );
}
