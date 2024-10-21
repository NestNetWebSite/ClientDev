// COMPONENT: 댓글
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { StringCombinator } from '../../../../_utils/StringCombinator';
import getAvatarStyle from '../../../../_utils/getAvatarStyle';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';
import { ICommentDto } from '../../types';
import { AxiosResponse } from 'axios';

interface IModifiedCommentProps {
    commentId: number;
    updateValue: string;
}

interface ICommentProps {
    comment: ICommentDto;
}
export default function Comment({ comment }: ICommentProps) {
    const {
        commentId,
        username,
        memberAuthority,
        content,
        createdTime,
        modifiedTime,
        memberWritten: isMemberWritten,
    } = comment;

    // 댓글 수정중 내용
    const [updateValue, setUpdateValue] = useState<string>('');

    // 수정여부
    const [isUpdateTarget, setIsUpdateTarget] = useState<boolean>(false);
    const updateInputRef = useRef<HTMLTextAreaElement>(null);

    const { mutate: updateComment, isPending: isUpdatePending } = useUpdateComment();
    const { mutate: deleteComment } = useDeleteComment();

    // 수정 시도
    const onUpdateTargetClick = () => {
        setIsUpdateTarget(true);
        setUpdateValue(content);
    };

    // 수정 완료
    const handleUpdateComplete = () => {
        if (updateValue === '') {
            alert('내용을 입력해주세요!');
            return;
        }
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
            // type='text'
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
                    {/* 프로필 */}
                    <div
                        className='mr-6 flex h-12 w-12 min-w-12 items-center justify-center rounded-full text-center text-sm'
                        style={getAvatarStyle(memberAuthority)}
                    >
                        {username.slice(0, 3)}
                    </div>
                    {/* 댓글 내용 */}
                    <div className='w-full break-all'>
                        {isUpdateTarget ? (
                            updateInput
                        ) : (
                            <div className='w-full whitespace-normal'>
                                {isUpdatePending ? (
                                    <div className='h-fit w-full text-center'>
                                        <LoadingSpinner size={20} />
                                    </div>
                                ) : (
                                    content
                                )}
                            </div>
                        )}
                        <div className='mt-2 flex flex-row justify-between pr-4 text-[0.8rem]'>
                            <div className={`${isUpdateTarget ? 'invisible' : ''}`}>
                                <span className='mr-2'>{StringCombinator.getFormatDate(createdTime)}</span>
                                {modifiedTime ? <span>(수정됨)</span> : null}
                            </div>
                            {/* 댓글 수정 및 삭제 버튼 */}
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
    const { boardId } = useParams();

    return useMutation<AxiosResponse, Error, IModifiedCommentProps>({
        mutationFn: async ({ commentId, updateValue }) => {
            const commentUpdateURL = `/api/comment/modify/${commentId}`;
            return await axios.post(commentUpdateURL, {
                content: updateValue,
            });
        },

        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['album', boardId] });
        },
        onError: () => {
            window.alert('댓글 수정에 실패하였습니다.');
        },
    });
}

// REST: 댓글 삭제
function useDeleteComment() {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation<AxiosResponse, Error, number>({
        mutationFn: async commentId => {
            const commentDeletionURL = `/api/comment/delete/${commentId}`;
            return await axios.delete(commentDeletionURL);
        },

        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['album', boardId] });
        },
        onError: () => {
            window.alert('댓글 삭제에 실패하였습니다.');
        },
    });
}
