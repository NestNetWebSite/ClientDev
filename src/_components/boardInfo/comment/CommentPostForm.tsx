import axios from 'axios';
import { FormEventHandler, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CommentPostForm({ boardId }: { boardId: string }) {
    const [commentContent, setCommentContent] = useState<string>('');
    const queryClient = useQueryClient();

    const { mutate: commentPostMutate } = useMutation({
        mutationFn(content: string) {
            return axios.post(`/api/comment/${boardId}`, { content });
        },

        onSuccess(): void {
            queryClient.invalidateQueries({ queryKey: ['board'] }).then(() => setCommentContent(''));
        },

        onError(error): void {
            window.alert(error);
        },
    });

    const handleFormSubmit: FormEventHandler = useCallback(
        event => {
            event.preventDefault();
            commentPostMutate(commentContent);
        },
        [commentContent],
    );

    return (
        <form className='mb-6 mt-3 flex w-full flex-col' onSubmit={handleFormSubmit}>
            <textarea
                className='h-[8rem] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[0.9rem] text-base shadow-lg focus:outline-none'
                value={commentContent}
                onChange={event => {
                    setCommentContent(event.target.value);
                }}
                placeholder={'댓글을 작성해주세요.'}
            />
            <div className='mt-5 text-right'>
                <button
                    className='rounded-2xl bg-rose-800 px-4 py-2 text-base font-semibold text-white transition-all enabled:opacity-100 enabled:hover:scale-105 disabled:cursor-default disabled:opacity-75'
                    type={'submit'}
                    disabled={commentContent.trim().length === 0}
                >
                    댓글 남기기
                </button>
            </div>
        </form>
    );
}
