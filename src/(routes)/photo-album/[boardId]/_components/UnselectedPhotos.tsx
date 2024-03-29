import { SetStateAction, memo, Dispatch } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { StringCombinator } from '../../../../_utils/StringCombinator';
import { IExistingFileDto } from '../../types';

interface IProps {
    photos: IExistingFileDto[];
    setSelectedPhoto: Dispatch<SetStateAction<string>>;
}

export default memo(function UnselectedPhotos({ photos, setSelectedPhoto }: IProps) {
    // 클릭된 사진으로 선택된 사진 변경하는 핸들러
    const handleUnselectedPhotoClick = (photoPath: string) => {
        setSelectedPhoto(photoPath);
    };

    // LOADING: 스켈레톤 효과 표시
    if (!photos) {
        return (
            <div className='flex h-screen w-full flex-col items-center justify-between'>
                {Array.from(new Array(4)).map((_, idx) => (
                    <div key={idx} className='mb-4 h-[12rem] w-full animate-pulse rounded-lg bg-skeleton'></div>
                ))}
            </div>
        );
    }

    if (photos) {
        return (
            <>
                {photos.map(photo => (
                    <div
                        key={photo.id}
                        className='ImageWrapper relative mb-4 overflow-hidden rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'
                    >
                        <img
                            className='w-full'
                            src={StringCombinator.getImageURL(photo.saveFilePath, photo.saveFileName)}
                            alt={photo.originalFileName}
                        />
                        <div
                            className='ImageCover absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black text-center text-sm text-white opacity-0 duration-300 ease-in-out hover:cursor-pointer hover:opacity-75'
                            onClick={() =>
                                handleUnselectedPhotoClick(
                                    StringCombinator.getImageURL(photo.saveFilePath, photo.saveFileName),
                                )
                            }
                        >
                            <FaMagnifyingGlass className={'text-4xl'} />
                        </div>
                    </div>
                ))}
            </>
        );
    }
});
