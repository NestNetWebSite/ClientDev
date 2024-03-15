import { useRef, memo } from 'react';
import toggleFullScreen from '../../../../_hooks/useFullScreen';

interface IProps {
    selectedPhoto: string;
}

export default memo(function SelectedPhoto({ selectedPhoto }: IProps) {
    const selectedPhotoRef = useRef<HTMLImageElement>();
    // LOADING: 스켈레톤
    if (selectedPhoto === '') {
        return <div className='h-full w-full animate-pulse bg-skeleton' />;
    }

    if (selectedPhoto !== '')
        return (
            <img
                className='m-auto'
                src={selectedPhoto}
                alt='thumbnail'
                ref={selectedPhotoRef}
                onDoubleClick={() => toggleFullScreen(selectedPhotoRef.current)}
            />
        );
});
