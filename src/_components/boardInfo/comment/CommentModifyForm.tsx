import { FormEventHandler, useCallback, useState } from 'react';

interface Props {
    commentId: number;
    currentCommentContent: string;

    closeCommentModifyForm(): void;

    modifyComment(id: number, newContent: string): void;
}

export default function CommentModifyForm({
    commentId,
    currentCommentContent,
    closeCommentModifyForm,
    modifyComment,
}: Props) {
    const [newCommentContent, setNewCommentContent] = useState(currentCommentContent);

    const handleFormSubmit: FormEventHandler = useCallback(
        event => {
            event.preventDefault();
            closeCommentModifyForm();
            modifyComment(commentId, newCommentContent);
        },
        [newCommentContent],
    );

    return (
        <form className={'my-5 flex w-full flex-col'} onSubmit={handleFormSubmit}>
            <textarea
                className='h-24 resize-none rounded-xl border border-gray-200 px-4 py-3 text-[0.9rem] shadow-md focus:outline-none'
                onChange={event => {
                    setNewCommentContent(event.target.value);
                }}
                placeholder={'새로운 댓글을 작성해주세요.'}
                value={newCommentContent}
            />
            <div className='text-right'>
                <button
                    className='mt-4 rounded-xl bg-secondary px-3 py-1 text-sm font-semibold text-white duration-300 enabled:opacity-100 enabled:hover:scale-105 disabled:cursor-default disabled:opacity-75'
                    type={'submit'}
                    disabled={newCommentContent.trim().length === 0}
                >
                    댓글 수정
                </button>
            </div>
        </form>
    );
}
