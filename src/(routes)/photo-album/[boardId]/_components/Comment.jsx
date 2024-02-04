import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { StringCombinator } from '../../../../_utils/StringCombinator';

/**
 * 댓글
 * @param {Object}
 * @returns
 */
export default function Comment({ comment }) {
    const { id: commentId, username, content, createdTime, modifiedTime, memberWritten: isMemberWritten } = comment;

    // 댓글 수정중 내용
    const [updateValue, setUpdateValue] = useState('');

    // 수정여부
    const [isUpdateTarget, setIsUpdateTarget] = useState(false);
    const updateInputRef = useRef(null);

    const { mutate: updateComment, isPending: isUpdatePending } = useUpdateComment();
    const { mutate: deleteComment } = useDeleteComment();

    // 수정 시도
    const onUpdateTargetClick = () => {
        setIsUpdateTarget(true);
        setUpdateValue(content);
    };

    // 수정 완료
    const handleUpdateComplete = () => {
        updateComment({ commentId, updateValue });
        setIsUpdateTarget(false);
    };

    // 삭제 시도
    const handleCommentDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteComment(commentId);
        }
    };

    // 댓글 수정창
    const updateInput = (
        <textarea
            onChange={() => setUpdateValue(updateInputRef.current.value)}
            className='flex w-full break-all border-b border-red-300 px-3 focus:border-red-500 focus:outline-none'
            type='text'
            value={updateValue}
            ref={updateInputRef}
            minLength={2}
            maxLength={100}
            rows={2}
        />
    );

    return (
        <>
            <li className='w-full' key={commentId}>
                <div className='flex w-full pb-4'>
                    {/* 프로필 원 */}
                    <div className='mr-4 w-12 max-w-12'>{username}</div>
                    <div className='w-full break-all'>
                        {isUpdateTarget ? (
                            updateInput
                        ) : (
                            <div className='w-full whitespace-normal'>
                                {isUpdatePending ? (
                                    <div className='h-fit w-full text-center'>{/* 로딩스피너 */}</div>
                                ) : (
                                    content
                                )}
                            </div>
                        )}
                        <div className='mt-2 flex flex-row justify-between pr-4 text-[0.8rem]'>
                            <div className={`${isUpdateTarget ? 'invisible' : ''}`}>
                                <span className='mr-2'>{StringCombinator.getFormatDate(createdTime)}</span>
                                {/* 수정됨 표시 테스트 필요 */}
                                {modifiedTime.length !== 0 ? (
                                    <>
                                        <span>(수정됨)</span>
                                    </>
                                ) : null}
                            </div>
                            {/* 댓글 수정 및 삭제 관련 버튼 */}
                            <div>
                                {isMemberWritten ? (
                                    isUpdateTarget ? (
                                        <>
                                            <button className='mr-2' onClick={() => setIsUpdateTarget(false)}>
                                                취소
                                            </button>
                                            <button onClick={() => handleUpdateComplete()}>완료</button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className='mr-2 hover:underline hover:underline-offset-2'
                                                onClick={() => onUpdateTargetClick()}
                                            >
                                                수정
                                            </button>
                                            <button
                                                className='hover:underline hover:underline-offset-2'
                                                onClick={() => handleCommentDelete()}
                                            >
                                                삭제
                                            </button>
                                        </>
                                    )
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

// REST: 댓글 수정
function useUpdateComment() {
    const queryClient = useQueryClient();
    const { postId } = useParams();

    return useMutation({
        mutationFn: async ({ commentId, updateValue }) => {
            const commentUpdateURL = `/api/comment/modify/${commentId}`;
            return await axios.post(commentUpdateURL, {
                content: updateValue,
            });
        },

        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['album', postId]);
        },
        onError: () => {
            window.alert('댓글 수정에 실패하였습니다.');
        },
    });
}

// REST: 댓글 삭제
function useDeleteComment() {
    const queryClient = useQueryClient();
    const { postId } = useParams();

    return useMutation({
        mutationFn: async commentId => {
            const commentDeletionURL = `/api/comment/delete/${commentId}`;
            return await axios.delete(commentDeletionURL);
        },

        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['album', postId]);
        },
        onError: () => {
            window.alert('댓글 삭제에 실패하였습니다.');
        },
    });
}
