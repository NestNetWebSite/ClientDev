import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import axios, { AxiosResponse } from 'axios';
import { debounce } from 'lodash';
import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IProps {
    isMemberLiked: boolean;
    likeCount: number;
}

export default function LikeBtn({ isMemberLiked, likeCount }: IProps) {
    const { data: isLiked } = useGetIsMemberLiked(isMemberLiked);
    const [oldLikeState] = useState(isMemberLiked);
    const [oldLikeCount] = useState(likeCount);
    const { mutate: updateAlbumLike } = usePostAlbumLike(oldLikeState, oldLikeCount);
    const queryClient = useQueryClient();
    const debouncedMutate = debounce(updateAlbumLike, 500);

    // 좋아요 버튼 클릭 핸들러
    const handleButtonClick = useCallback(async (): Promise<void> => {
        // 쿼리 차단
        await queryClient.cancelQueries({ queryKey: ['likeState'] });
        await queryClient.cancelQueries({ queryKey: ['likeCount'] });

        // 캐시정보 업데이트
        const previousLikeState = queryClient.getQueryData(['likeState']);
        const previousLikeCount: number = queryClient.getQueryData(['likeCount']);
        queryClient.setQueryData(['likeState'], !previousLikeState);
        queryClient.setQueryData(['likeCount'], previousLikeState ? previousLikeCount - 1 : previousLikeCount + 1);
        // Mutation 수행
        // updateAlbumLike();
        debouncedMutate();
    }, []);

    return (
        <Button
            onClick={() => handleButtonClick()}
            content={
                isLiked ? (
                    <div className='flex flex-col justify-between'>
                        <FaHeart className='text-2xl text-red-400' />
                        <span className='bottom-0 w-full text-center text-[0.6rem]'>{likeCount}</span>
                    </div>
                ) : (
                    <div className='flex flex-col justify-between'>
                        <FaHeart className='text-2xl text-slate-300' />
                        <span className='bottom-0 w-full text-center text-[0.6rem]'>{likeCount}</span>
                    </div>
                )
            }
        />
    );
}

// 좋아요 여부 캐시 저장
function useGetIsMemberLiked(isMemberLiked: boolean) {
    return useQuery<boolean, Error>({
        queryKey: ['likeState'],
        queryFn() {
            return Promise.resolve(isMemberLiked);
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        gcTime: 0,
    });
}

// REST: 좋아요 요청
function usePostAlbumLike(oldLikeState: boolean, oldLikeCount: number) {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation<AxiosResponse, Error>({
        mutationFn() {
            const likeState = queryClient.getQueryData(['likeState']);
            return axios.post(
                `/api/post/${likeState ? 'like' : 'cancel-like'}`,
                { postId: boardId },
                {
                    headers: { Authorization: localStorage.getItem('access_token') },
                },
            );
        },
        // 클라이언트 업데이트
        // SUCCESS: 재조회
        onSuccess() {
            return queryClient.invalidateQueries({ queryKey: ['album', boardId] });
        },

        // ERROR: 기존 데이터 폴백
        onError() {
            queryClient.setQueryData(['likeState'], oldLikeState);
            queryClient.setQueryData(['likeCount'], oldLikeCount);
        },
    });
}
