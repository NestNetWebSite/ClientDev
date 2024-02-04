import { CiHeart } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { PiEyeLight } from 'react-icons/pi';
import formatNumber from '../../../_utils/formatNumber';

interface Props {
    id: string | number;
    userName: string;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;
    onBoardClick: (id: number | string) => void;
}

export default function UnifiedBoard({ id, userName, title, createdTime, viewCount, likeCount, onBoardClick }: Props) {
    return (
        <article
            className={
                'flex h-36 cursor-pointer flex-col justify-between border-b border-gray-200 px-7 py-6 transition-all hover:bg-gray-100'
            }
            onClick={() => {
                onBoardClick(id);
            }}
        >
            <div className={'flex items-center gap-x-2'}>
                <div className={'flex gap-x-1.5'}>
                    <FaRegUser className={'h-5 w-5'} />
                    <span className={'text-[0.9rem] font-bold text-black'}>{userName}</span>
                </div>
                ·
                <div>
                    <span className={'text-sm text-gray-500'}>
                        작성일 : {createdTime[0]}년 {createdTime[1]}월 {createdTime[2]}일
                    </span>
                </div>
            </div>
            <div className={'mb-5 mt-3'}>
                <h1 className={'line-clamp-1 text-xl font-bold text-black'}>{title}</h1>
            </div>
            <div className={'flex justify-end gap-x-2.5'}>
                <div className={'flex items-center gap-x-1'}>
                    <CiHeart className={'h-6 w-6 text-red-400'} />
                    <span className={'text-sm text-gray-600'}>{formatNumber(likeCount, 1)}</span>
                </div>
                <div className={'flex items-center gap-x-1'}>
                    <PiEyeLight className={'h-6 w-6 text-blue-400'} />
                    <span className={'text-sm text-gray-600'}>{formatNumber(viewCount, 1)}</span>
                </div>
            </div>
        </article>
    );
}
