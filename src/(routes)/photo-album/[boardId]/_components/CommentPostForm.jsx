import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FiSend } from 'react-icons/fi';

/**
 * 사진첩 댓글 작성 폼
 * @param {boolean}
 * @returns
 */
export default function CommentPostForm({ isMetadataVisible }) {
    // 새로운 댓글 내용
    const [newComment, setNewComment] = useState('');

    const inputRef = useRef(null);

    const handleCommentInputChange = () => {
        setNewComment(inputRef.current.value);
    };

    const { mutate: createComment, isPending: isCommentPending } = useCreateComment();

    // 댓글 작성
    const handleCommentCreate = event => {
        event.preventDefault();
        if (newComment === '') {
            return;
        }
        createComment(newComment);
    };

    return (
        <>
            {isMetadataVisible ? (
                <div className='CommentFormBlock sticky bottom-0 h-[6rem] w-full rounded-b-2xl bg-white  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                    <form
                        className='CommentForm flex w-full flex-auto flex-row items-center p-6 pl-10 pr-6'
                        onSubmit={handleCommentCreate}
                    >
                        {isCommentPending ? (
                            <div className='flex h-full w-full justify-center pb-1 pt-2'>{/* 로딩 스피너 */}</div>
                        ) : (
                            <input
                                onChange={handleCommentInputChange}
                                className='CommentInput mr-4 flex h-[3rem] w-full rounded-2xl border-none bg-[#efefef] px-6 py-0 outline-4 outline-secondary'
                                type='text'
                                placeholder='댓글 추가'
                                ref={inputRef}
                            />
                        )}
                        <button className='CommentPostBtn h-10 w-10 text-primary' disabled={isCommentPending}>
                            <FiSend size={32} />
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    );
}

// REST: 댓글 작성
function useCreateComment() {
    const queryClient = useQueryClient();
    const { postId } = useParams();

    return useMutation({
        mutationFn: async newComment => {
            const commentPostURL = `${import.meta.env.VITE_APP_SERVER}/comment/${postId}`;

            return await axios.post(commentPostURL, {
                content: newComment,
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['album', postId]);
        },
    });
}
