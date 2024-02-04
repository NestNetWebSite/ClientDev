import { memo } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { StringCombinator } from '../../../_utils/StringCombinator';

/**
 * 사진첩 썸네일
 */
export default memo(function PhotoAlbumThumbnail({ item: photoAlbum }) {
    return (
        <>
            <div className='ThumbnailWrapper relative flex h-min w-full flex-col overflow-hidden rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
                <img
                    src={StringCombinator.getImageURL(photoAlbum)}
                    alt='photo-album_thumbnail'
                    className='ThumbnailImage rounded-xl'
                />
                {/* 썸네일 호버시 나타나는 커버 */}
                <div className='absolute left-0 top-0 flex h-full w-full cursor-zoom-in flex-col justify-between rounded-xl opacity-0 duration-300 hover:bg-black hover:opacity-80'>
                    <div className='mx-6 mt-6 text-center text-2xl font-bold text-white'>{photoAlbum.title}</div>
                    <div className='Metadata my-6 flex flex-row items-center justify-center text-[#666666]'>
                        <div className='Visits mx-2 flex flex-row'>
                            <span className='mr-2'>
                                <FaEye />
                            </span>
                            <span className='leading-[100%]'>{photoAlbum.viewCount}</span>
                        </div>
                        <div className='Likes mx-2 flex flex-row'>
                            <span className='mr-2'>
                                <FaHeart />
                            </span>
                            <span className='leading-[100%]'>{photoAlbum.likeCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
