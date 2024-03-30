import { useRef, memo } from 'react';
import toggleFullScreen from '../../../../_hooks/useFullScreen';
import { StringCombinator } from '../../../../_utils/StringCombinator';
import { IExistingFileDto } from '../../types';

export default memo(function SelectedPhoto({ selectedPhoto }: { selectedPhoto: IExistingFileDto }) {
    const selectedPhotoRef = useRef<HTMLImageElement>();
    // LOADING: 스켈레톤
    if (!selectedPhoto) {
        return <div className='h-full w-full animate-pulse bg-skeleton' />;
    }

    if (selectedPhoto) {
        const selectedPhotoURL = StringCombinator.getImageURL(selectedPhoto?.saveFilePath, selectedPhoto?.saveFileName);
        return (
            <img
                className='m-auto'
                src={selectedPhotoURL}
                alt='thumbnail'
                ref={selectedPhotoRef}
                onDoubleClick={() => toggleFullScreen(selectedPhotoRef.current)}
            />
        );
    }
});
