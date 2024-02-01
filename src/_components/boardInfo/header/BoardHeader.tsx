import { useQuery } from '@tanstack/react-query';
import { CiHeart } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { PiEyeLight } from 'react-icons/pi';
import formatNumber from '../../../_utils/formatNumber';

interface Props {
    title: string;
    username: string;
    viewCount: number;
    likeCount: number;
    createdTime: number[] | string;
    modifiedTime: number[] | string | null;

    onModifyTextClick(): void;

    onDeleteTextClick(): void;

    memberWritten: boolean;
}

export default function BoardHeader({
    title,
    username,
    viewCount,
    likeCount,
    createdTime,
    modifiedTime,
    onModifyTextClick,
    onDeleteTextClick,
    memberWritten,
}: Props) {
    const { data } = useQuery({
        queryKey: ['likeCount'],
        queryFn: () => Promise.resolve(likeCount),
        retry: false,
        refetchOnWindowFocus: false,
    });

    return (
        <header className='mb-4'>
            <h1 className='mb-10 text-4xl font-extrabold'>{title}</h1>
            <div className='mb-3 mt-7 flex justify-between'>
                <div className='flex items-center'>
                    <div className='mr-5 flex items-center'>
                        <FaRegUser className={'mr-2.5 h-6 w-6'} />
                        <span className='text-[15px] font-bold'>{username}</span>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        <span className='text-[15px] text-gray-600'>
                            {`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
                        </span>
                        {modifiedTime !== null && (
                            <span className='text-[15px] text-gray-600'>
                                <span className={'font-semibold'}>최종 수정</span> :{' '}
                                {`${modifiedTime[0]}년 ${modifiedTime[1]}월 ${modifiedTime[2]}일`}
                            </span>
                        )}
                    </div>
                </div>
                <div className={'flex items-center gap-x-7'}>
                    <div className={'flex items-center gap-x-2'}>
                        <CiHeart className='h-7 w-7 text-red-400' />
                        <span className='text-base text-gray-600'>{formatNumber(data, 1)}</span>
                    </div>
                    <div className={'flex items-center gap-x-2'}>
                        <PiEyeLight className={'h-7 w-7 text-blue-400'} />
                        <span className={'text-base text-gray-600'}>{formatNumber(viewCount, 1)}</span>
                    </div>
                </div>
            </div>
            {memberWritten && (
                <div className={'mt-2 flex items-center justify-end gap-x-4'}>
                    <span
                        className={'cursor-pointer text-[0.95rem] text-gray-500 duration-300 hover:text-gray-900'}
                        onClick={onModifyTextClick}
                    >
                        수정
                    </span>
                    <span
                        className={'cursor-pointer text-[0.95rem] text-gray-500 duration-300 hover:text-gray-900'}
                        onClick={onDeleteTextClick}
                    >
                        삭제
                    </span>
                </div>
            )}
        </header>
    );
}
