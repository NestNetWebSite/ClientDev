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

// Masonary 레이아웃 열 갯수 (반응형)
const breakpointColumnsObj = {
    default: 3,
    900: 2,
    300: 1,
};

/**
 * 사진게시판 페이지
 * @returns
 */
export default function Page() {
    // 무한스크롤 api 호출 지점 옵저버
    const { ref: observeBtmRef, inView } = useInView();

    const navigate = useNavigate();

    // 리액트 쿼리 무한스크롤 api
    const {
        data: photoAlbums,
        isPhotoAlbumsPending,
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
                className='fixed bottom-10 right-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full bg-primary text-white'
                onClick={() => navigate(`/${PAGE_ROUTE.PHOTOALBUMS}/post`)}
            >
                <FaPlus />
            </div>
            {/* 게시물 목록 */}
            <div className='relative mx-auto flex h-[calc(100dvh-4.68rem)] w-[70rem] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide'>
                <Flex w={1120} as={Masonry} breakpointCols={breakpointColumnsObj}>
                    {/* LOADING: 스켈레톤  */}
                    {isPhotoAlbumsPending &&
                        Array.from(new Array(9)).map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    margin: '1rem',
                                    minWidth: '22.65rem',
                                    maxWidth: '22.65rem',
                                    height: '25rem',
                                }}
                            >
                                <Skeleton variant='rounded' height='100%' />
                            </Box>
                        ))}
                    {!isPhotoAlbumsPending &&
                        photoAlbums?.pages.map(photoAlbums =>
                            photoAlbums.map((photoAlbum, idx) => {
                                if (photoAlbums.length === idx + 1) {
                                    return (
                                        <div className='m-4 h-min' ref={observeBtmRef}>
                                            <Link to={`${photoAlbum.id}`}>
                                                <PhotoAlbumThumbnail key={photoAlbum.postId} metaData={photoAlbum} />
                                            </Link>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className='m-4 h-min'>
                                            <Link to={`${photoAlbum.id}`}>
                                                <PhotoAlbumThumbnail key={photoAlbum.postId} metaData={photoAlbum} />
                                            </Link>
                                        </div>
                                    );
                                }
                            }),
                        )}
                </Flex>
            </div>
            {/* 로딩스피너 */}
            <div className='h-fit w-full text-center'>{isFetchingNextPage && <LoadingSpinner size={24} />}</div>
        </>
    );
}

// REST: 스크롤시 다음 페이지의 앨범데이터를 가져옴
const getMorePhotoAlbums = async ({ pageParam }) => {
    const photoAlbumsURL = `/api/photo-post?page=${pageParam}`;
    return await axios.get(photoAlbumsURL, { withCredentials: true }).then(res => {
        return res.data.response.dtoList;
    });
};
