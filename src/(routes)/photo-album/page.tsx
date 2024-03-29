import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { Flex } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import PhotoAlbumThumbnail from './_components/PhotoAlbumThumbnail';
import LoadingSpinner from '../../_components/loadingSpinner/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import { PAGE_ROUTE } from '../../_constants/constants';
import { IPhotoAlbumMetaData } from './types';

// Masonary 레이아웃 열 갯수 (반응형)
const breakpointColumnsObj = {
    default: 3,
    900: 2,
    600: 1,
};

export default function Page() {
    // 무한스크롤 api 호출 지점 옵저버
    const { ref: observeBtmRef, inView } = useInView();

    const navigate = useNavigate();

    // 리액트 쿼리 무한스크롤 api
    const {
        data: photoAlbumPages,
        isPending: isPhotoAlbumsPending,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['albums'],
        queryFn: getMorePhotoAlbums,
        // page 파라미터 초기값
        initialPageParam: 1,
        // lastPage: 마지막에 불러온 한 페이지 내 배열, allPages: 현재까지 불러온 총페이지 배열
        getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
        throwOnError: true,
        retry: 0,
    });

    // ref가 inView 영역에 도달하면 다음 페이지를 불러옴
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <>
            {/* 사진게시판 게시물 등록 버튼 */}
            <div
                className='fixed bottom-10 right-12 z-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full bg-primary text-white'
                onClick={() => navigate(`/${PAGE_ROUTE.PHOTOALBUMS}/post`)}
            >
                <FaPlus />
            </div>
            {/* 게시물 목록 */}
            <div className='relative mx-auto flex h-[calc(100dvh-4.68rem)] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide xl:w-[70rem]'>
                <Flex sx={{ width: '100%' }} as={Masonry} breakpointCols={breakpointColumnsObj}>
                    {/* LOADING: 스켈레톤  */}
                    {isPhotoAlbumsPending &&
                        Array.from(new Array(9)).map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    margin: '1rem',
                                    maxWidth: '22.65rem',
                                    height: '24rem',
                                }}
                            >
                                <Skeleton variant='rounded' height='100%' />
                            </Box>
                        ))}
                    {!isPhotoAlbumsPending &&
                        photoAlbumPages?.pages.map(photoAlbumPage =>
                            photoAlbumPage.map((photoAlbum: IPhotoAlbumMetaData, idx: number) => (
                                <div
                                    className='m-4 h-min'
                                    ref={photoAlbumPage.length === idx + 1 ? observeBtmRef : null}
                                >
                                    <Link to={`${photoAlbum.id}`}>
                                        <PhotoAlbumThumbnail key={photoAlbum.id} thumbnailData={photoAlbum} />
                                    </Link>
                                </div>
                            )),
                        )}
                </Flex>
                {/* 로딩스피너 */}
                <div className='my-4 h-fit w-full text-center'>
                    {isFetchingNextPage && <LoadingSpinner size={32} />}
                </div>
            </div>
        </>
    );
}

// REST: 스크롤시 다음 페이지의 앨범데이터를 가져옴
const getMorePhotoAlbums = async ({ pageParam }) => {
    const photoAlbumPagesURL = `/api/photo-post?page=${pageParam}`;

    return await axios.get(photoAlbumPagesURL, { withCredentials: true }).then(res => {
        return res.data.response.dtoList;
    });
};
