import { CiHeart } from 'react-icons/ci';
import { PiEyeLight } from 'react-icons/pi';
import formatNumber from '../../../../_utils/formatNumber';

interface Props {
    id: number;
    title: string;
    postCategory: string;
    viewCount: number;
    likeCount: number;
    onBoardClick: (id: number, postCategory: string) => void;
}

export default function UserBoard({ id, title, postCategory, likeCount, viewCount, onBoardClick }: Props) {
    return (
        <li
            className={'flex flex-col gap-y-3 border-b px-6 py-4 hover:bg-gray-50'}
            onClick={() => {
                onBoardClick(id, postCategory);
            }}
        >
            <div>
                <h1 className={'text-xl font-bold'}>{title}</h1>
            </div>
            <div className={'flex justify-end'}>
                <div className={'flex items-center justify-center gap-x-6'}>
                    <div className={'flex items-center'}>
                        <CiHeart className={'h-5 w-5 text-red-500'} />
                        <span>{formatNumber(likeCount, 1)}</span>
                    </div>
                    <div className={'flex items-center'}>
                        <PiEyeLight className={'h-5 w-5 text-blue-500'} />
                        <span>{formatNumber(viewCount, 1)}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}
