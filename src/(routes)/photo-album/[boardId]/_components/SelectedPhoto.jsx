import { useRef, memo } from 'react';

/**
 * 선택된 사진 (현재 보고 있는 사진)
 * @param {String} selectedPhoto
 * @returns
 */
export default memo(function SelectedPhoto({ selectedPhoto }) {
    const selectedPhotoRef = useRef();

    // 이미지를 전체화면으로 키우는 함수
    const triggerImgFullScreen = element => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    return (
        <>
            {selectedPhoto ? (
                <img
                    className='m-auto'
                    src={selectedPhoto}
                    alt='thumbnail'
                    ref={selectedPhotoRef}
                    onDoubleClick={() => triggerImgFullScreen(selectedPhotoRef.current)}
                />
            ) : (
                <>
                    <div className='h-full w-full animate-pulse bg-skeleton' />
                </>
            )}
        </>
    );
});
