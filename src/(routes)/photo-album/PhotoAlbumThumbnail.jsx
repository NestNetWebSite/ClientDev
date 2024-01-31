import { memo } from 'react';
import { FaHeart, FaEye } from 'react-icons/fa';
import { StringCombinator } from '../../_utils/StringCombinator';

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
                <div className='MetaData absolute left-0 top-0 h-full w-full cursor-zoom-in rounded-xl opacity-0 duration-300 hover:bg-black hover:opacity-80'>
                    <div className='Title mx-6 mt-6 text-center text-2xl font-bold text-white'>{photoAlbum.title}</div>
                    <div className='CntData absolute bottom-0 right-0 m-5 mr-6 text-[#666666]'>
                        <span className='ViewCnt mr-2'>
                            <FaEye /> <span>{photoAlbum.viewCount}</span>
                        </span>
                        <span className='LikeCnt ml-2'>
                            <FaHeart /> <span>{photoAlbum.likeCount}</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
});
