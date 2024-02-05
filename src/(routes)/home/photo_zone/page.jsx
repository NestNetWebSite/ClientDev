import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SlidingPhotos from './_components/SlidingPhotos';
import PhotoPostForm from './_components/PhotoPostForm';

/**
 * 포토존(인생네컷) 섹션
 * @param {boolean}
 * @returns
 */
export default function Page({ inView }) {
    // 옵저버 감지시 조회 api 호출
    const { data: photos = [], isLoading: isPhotosLoading } = useGetPhotos(inView);

    return (
        <>
            {/* 사진 업로드 */}
            <div className='header mb-14 flex flex-row justify-start pl-16'>
                <PhotoPostForm />
            </div>
            {/* 사진 리스트 */}
            {isPhotosLoading ? (
                // LOADING: 스켈레톤
                <div className='flex h-[30rem] w-full flex-row overflow-hidden'>
                    {Array.from(new Array(5)).map((_, idx) => (
                        <div
                            key={idx}
                            className='mx-2 h-[28rem] w-[20rem] min-w-[20rem] animate-pulse rounded-sm bg-skeleton'
                        />
                    ))}
                </div>
            ) : (
                <SlidingPhotos photos={photos} />
            )}
        </>
    );
}

// REST: 포토존 사진 조회
const useGetPhotos = inView => {
    return useQuery({
        queryKey: ['photo-zone'],
        queryFn: async () => {
            const photoZoneURL = `/api/life4cut?size=20`;
            return await axios
                .get(photoZoneURL)
                .then(res => {
                    return res.data.response.dtoList;
                })
                .catch(e => {
                    if (e.response) {
                        console.log(e.response);
                    }
                });
        },
        gcTime: 0,
        enabled: inView,
    });
};
