import { useRef, memo } from 'react';
import { MdUpload } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { AiFillFileImage } from 'react-icons/ai';
import { StringCombinator } from '../../_utils/StringCombinator.js';
import { ORIGINAL_FILE_FLAG } from '../../_constants/constants.js';
import { nanoid } from 'nanoid';

/**
 * 파일 인풋 박스
 */
export default memo(function FileInput({
    uploadFiles,
    setUploadFiles,
    existingPhotoIds,
    setExistingPhotoIds,
    isModifying,
}) {
    // 파일 인풋 ref
    const fileInputRef = useRef(null);
    // 스크롤 이벤트 위한 가짜 ref
    const lastFileRef = useRef(null);

    // 첨부 파일 추가
    const handleFileChange = event => {
        let photoFiles = event.target.files;
        setUploadFiles([
            ...uploadFiles,
            ...Array.from(photoFiles).map(photoFile => ({
                id: nanoid(),
                photoFile,
            })),
        ]);
        // 파일 업로드 직후 제일 마지막 파일로 스크롤 이벤트
        setTimeout(() => {
            lastFileRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end',
            });
        }, 100);
    };

    // 첨부 파일 삭제
    const handleFileDelete = targetFileId => {
        // 수정 중 파일 삭제시 기존 파일 아이디를 저장한 리스트에서 해당 파일 아이디를 삭제
        if (isModifying) {
            setExistingPhotoIds(existingPhotoIds.filter(id => id !== targetFileId));
        }
        setUploadFiles(uploadFiles.filter(file => file.id !== targetFileId));
    };

    return (
        <>
            <div className={'flex w-1/2 flex-col items-center'}>
                <input
                    type={'file'}
                    ref={fileInputRef}
                    className={'hidden'}
                    onChange={handleFileChange}
                    accept='.gif, .jpg, .jpeg, .png'
                    multiple={true}
                />
                <div className={'FilesContainer h-[90%] w-full overflow-y-auto whitespace-nowrap'}>
                    {uploadFiles.length === 0 ? (
                        <div
                            className={
                                'flex h-full w-full min-w-max flex-col items-center justify-center rounded-2xl border-2 border-dotted border-stone-600 bg-slate-200'
                            }
                        >
                            <AiFillFileImage className={'mb-4 h-10 w-10'} />
                            <span className='text-center'>
                                아래 업로드 버튼을 클릭하여
                                <hr /> 사진을 추가하세요.
                            </span>
                        </div>
                    ) : (
                        <>
                            {uploadFiles.map(fileInfo => (
                                <div
                                    key={fileInfo.id}
                                    className={
                                        'relative my-2 flex aspect-auto w-full flex-col overflow-hidden rounded-xl bg-gray-100 shadow-md brightness-95'
                                    }
                                >
                                    {/* 기존 사진 파일인 경우와 새로 업로드하는 파일 src 구분 */}
                                    {ORIGINAL_FILE_FLAG in fileInfo ? (
                                        <img
                                            className='object-scale-down object-center'
                                            src={StringCombinator.getImageURL(fileInfo)}
                                            alt='기존사진'
                                        />
                                    ) : (
                                        <img src={URL.createObjectURL(fileInfo.photoFile)} alt='업로드된 사진' />
                                    )}
                                    <button
                                        type={'button'}
                                        onClick={() => {
                                            fileInputRef.current.value = null;
                                            handleFileDelete(fileInfo.id);
                                        }}
                                        className={
                                            'absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white duration-300'
                                        }
                                    >
                                        <FaTrash className={'mx-auto h-4 w-4'} />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                    <div className='h-[1px] w-full opacity-0' ref={lastFileRef}></div>
                </div>
                <button
                    type={'button'}
                    onClick={() => fileInputRef.current.click()}
                    className={
                        'FileAddBtn mt-6 h-[3rem] w-[3rem] overflow-hidden rounded-full bg-gray-400 text-white shadow-md transition-all hover:bg-gray-500'
                    }
                >
                    <MdUpload className={'h-full w-full p-2'} />
                </button>
            </div>
        </>
    );
});
