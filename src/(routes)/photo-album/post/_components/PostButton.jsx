export default function PostButton({ isPostBtnDisabled, isModifying }) {
    return (
        <button
            disabled={isPostBtnDisabled}
            className={`rounded-3xl bg-primary px-4 py-3 text-lg font-bold text-white ${
                isPostBtnDisabled ? 'cursor-default opacity-75' : 'opacity-100'
            }`}
        >
            {isModifying ? '수정' : '저장'}
        </button>
    );
}
