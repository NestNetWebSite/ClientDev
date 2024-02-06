import { CiHeart } from 'react-icons/ci';
import { PiEyeLight } from 'react-icons/pi';
import formatNumber from '../../../_utils/formatNumber';

interface Props {
    id: number;
    title: string;
    viewCount: number;
    likeCount: number;
    createdTime: number[];
    saveFilePath: string;
    saveFileName: string;
    onBoardClick: (id: number) => void;
}

export default function AboutMeBoard({
    id,
    title,
    viewCount,
    likeCount,
    createdTime,
    saveFilePath,
    saveFileName,
    onBoardClick,
}: Props) {
    return (
        <article
            className={
                'flex h-36 cursor-pointer items-center gap-x-5 border-b border-gray-200 px-7 py-6 transition-all hover:bg-gray-100'
            }
            onClick={() => {
                onBoardClick(id);
            }}
        >
            <div className={'relative h-28 w-28 rounded-lg border border-gray-200'}>
                {saveFileName ? (
                    <img
                        className={'h-28 w-28 rounded-lg bg-center object-cover'}
                        src={`/api/image/${saveFilePath}/${saveFileName}`}
                        alt={`thumbnail_${saveFileName}`}
                    />
                ) : (
                    <span
                        className={
                            'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-sm text-gray-500'
                        }
                    >
                        No Image
                    </span>
                )}
            </div>
            <div className={'flex h-full flex-1 flex-col justify-between'}>
                <div className={'flex flex-col'}>
                    <span className={'mx-1.5 mb-2 text-sm text-gray-500'}>
                        {createdTime[0]}년 {createdTime[1]}월 {createdTime[2]}일
                    </span>
                    <h1 className={'line-clamp-1 text-xl font-bold'}>{title}</h1>
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
            </div>
        </article>
    );
}
