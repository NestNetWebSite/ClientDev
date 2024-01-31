import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Masonry } from 'react-masonry-css';
import { Flex } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import PhotoAlbumThumbnail from './PhotoAlbumThumbnail';

// Masonary 레이아웃 열 갯수 (반응형)
const breakpointColumnsObj = {
    default: 3,
    1300: 2,
    1000: 1,
};

/**
 * 사진첩
 * @returns
 */
export default function PhotoAlbumBoard() {
    // 무한스크롤 api 호출 지점 옵저버
    const { ref: observeBtmRef, inView } = useInView();

    // 리액트 쿼리 무한스크롤 api
    const {
        data: photoAlbums,
        isPhotoAlbumsPending,
        fetchNextPage,
        hasNextPage,
        // isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['albums'],
        queryFn: getMorePhotoAlbums,
        // page 파라미터 초기값
        initialPageParam: 1,
        // lastPage: 마지막에 불러온 한 페이지 내 배열, allPages: 현재까지 불러온 총페이지 배열
        getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    });

    // ref가 inView 영역에 도달하면 다음 페이지를 불러옴
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // 에러 처리
    // if (status === 'error') return

    return (
        <>
            <div className='flex justify-center pt-20'>
                <Flex as={Masonry} breakpointCols={breakpointColumnsObj}>
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
                                        <div
                                            className='m-4 h-min min-w-[22.65rem] max-w-[22.65rem]'
                                            ref={observeBtmRef}
                                        >
                                            <Link to={`${photoAlbum.id}`}>
                                                <PhotoAlbumThumbnail key={photoAlbum.postId} item={photoAlbum} />
                                            </Link>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className='m-4 h-min min-w-[22.65rem] max-w-[22.65rem]'>
                                            <Link to={`${photoAlbum.id}`}>
                                                <PhotoAlbumThumbnail key={photoAlbum.postId} item={photoAlbum} />
                                            </Link>
                                        </div>
                                    );
                                }
                            }),
                        )}
                </Flex>
                {/* 로딩스피너 */}
                {/* {isFetchingNextPage && <LoadingSpinner />} */}
            </div>
        </>
    );
}

// REST: 스크롤시 다음 페이지의 앨범데이터를 가져옴
const getMorePhotoAlbums = async ({ pageParam }) => {
    const photoAlbumsURL = `${import.meta.env.VITE_APP_SERVER}/photo-post?page=${pageParam}`;
    return await axios.get(photoAlbumsURL, { withCredentials: true }).then(res => {
        return res.data.response.dtoList;
    });
};
