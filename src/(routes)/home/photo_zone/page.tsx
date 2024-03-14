import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SlidingPhotos from './_components/SlidingPhotos.jsx';
import PhotoPostForm from './_components/PhotoPostForm.tsx';
import { ISlidingPhoto } from '../type.tsx';

interface IProps {
    inView: boolean;
}

export default function Page({ inView }: IProps) {
    // 옵저버 감지시 조회 api 호출
    const { data: photos = [], isLoading: isPhotosLoading, isError } = useGetPhotos(inView);

    return (
        <>
            {/* 사진 업로드 */}
            <div className='header mb-14 flex flex-row justify-start pl-16'>
                <PhotoPostForm />
            </div>
            {/* 사진 리스트 */}
            {isError && <div className='w-full text-center'>사진 정보를 불러오지 못했습니다.</div>}
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
                <div className='relative space-y-2.5 overflow-hidden'>
                    <SlidingPhotos photos={photos} />
                </div>
            )}
        </>
    );
}

// REST: 포토존 사진 조회
const useGetPhotos = (inView: boolean) => {
    return useQuery<ISlidingPhoto[]>({
        queryKey: ['photo-zone'],
        queryFn: async () => {
            const photoZoneURL = `/api/life4cut?size=20`;
            return await axios.get(photoZoneURL).then(res => {
                return res.data.response.dtoList;
            });
        },
        retry: 0,
        gcTime: 0,
        enabled: inView,
    });
};
