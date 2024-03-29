import { useRef, memo } from 'react';
import { MdUpload } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { AiFillFileImage } from 'react-icons/ai';
import { StringCombinator } from '../../../_utils/StringCombinator';
import { ORIGINAL_FILE_FLAG } from '../../../_constants/constants';
import { nanoid } from 'nanoid';
import { IExistingFileDto, IUploadedFileDto } from '../types';
import { FILE_SIZE_MAX_LIMIT } from '../../../_constants/constants';

interface FileInputProps {
    files: (IExistingFileDto | IUploadedFileDto)[];
    setFiles: React.Dispatch<React.SetStateAction<(IExistingFileDto | IUploadedFileDto)[]>>;
    existingFileIds?: number[];
    setExistingFileIds?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default memo(function FileInput({ files, setFiles, existingFileIds, setExistingFileIds }: FileInputProps) {
    // 파일 인풋 ref
    const fileInputRef = useRef<HTMLInputElement>(null);
    // 스크롤 이벤트 위한 가짜 ref
    const lastFileRef = useRef<HTMLDivElement>(null);

    // 첨부 파일 추가
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetFiles = event.currentTarget.files;
        const filteredTargetFiles = Array.from(targetFiles).filter(targetFile => {
            if (targetFile.size >= FILE_SIZE_MAX_LIMIT) {
                window.alert('크기가 5MB 이상인 파일의 경우 제외됩니다.');
            }
            return targetFile.size < FILE_SIZE_MAX_LIMIT;
        });

        // 업로드된 파일들의 id 매핑 수행
        setFiles(prevFiles => [
            ...prevFiles,
            ...filteredTargetFiles.map((uploadedFile: File) => ({
                id: nanoid(),
                file: uploadedFile,
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
    const handleFileDelete = (targetFileId: number | string) => {
        // 파일 삭제시 기존 파일 아이디를 저장한 리스트에서 해당 파일 아이디를 삭제
        if (existingFileIds) {
            setExistingFileIds(existingFileIds.filter(id => id !== targetFileId));
        }
        setFiles(files.filter(uploadedFile => uploadedFile.id !== targetFileId));
    };

    return (
        <div className='flex h-full w-full flex-col items-center'>
            {/* <label className={'h-full w-full'} htmlFor='uploadfiles'> */}
            <input
                id='uploadfiles'
                type='file'
                ref={fileInputRef}
                // ref={register}
                className={'hidden'}
                onChange={handleFileChange}
                accept='.gif, .jpg, .jpeg, .png'
                multiple={true}
            />
            <div className={'FilesContainer h-[85%] w-full overflow-y-auto whitespace-nowrap'}>
                {files?.length === 0 ? (
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
                        {files?.map((fileItem: IExistingFileDto | IUploadedFileDto) => (
                            <div
                                key={fileItem.id}
                                className={
                                    'relative my-2 flex aspect-auto w-full flex-col overflow-hidden rounded-xl bg-gray-100 shadow-md brightness-95'
                                }
                            >
                                {/* 기존 사진 파일인 경우와 새로 업로드하는 파일 src 구분 */}
                                {ORIGINAL_FILE_FLAG in fileItem ? (
                                    <img
                                        className='object-scale-down object-center'
                                        src={StringCombinator.getImageURL(
                                            (fileItem as IExistingFileDto).saveFilePath,
                                            (fileItem as IExistingFileDto).saveFileName,
                                        )}
                                        alt='기존사진'
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL((fileItem as IUploadedFileDto).file)}
                                        alt='업로드된 사진'
                                    />
                                )}
                                {/* 업로드 취소 버튼 */}
                                <button
                                    type={'button'}
                                    onClick={() => {
                                        fileInputRef.current.value = null;
                                        handleFileDelete(fileItem.id);
                                    }}
                                    className={'absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white duration-300'}
                                >
                                    <FaTrash className={'mx-auto h-4 w-4'} />
                                </button>
                            </div>
                        ))}
                    </>
                )}
                <div className='h-[1px] w-full opacity-0' ref={lastFileRef}></div>
            </div>
            {/* </label> */}
            {/* 파일 업로드 버튼 */}
            <button
                type={'button'}
                onClick={() => fileInputRef.current.click()}
                className={
                    'FileAddBtn mt-6 h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] overflow-hidden rounded-full bg-gray-400 text-white shadow-md transition-all hover:bg-gray-500'
                }
            >
                <MdUpload className={'h-full w-full p-2'} />
            </button>
        </div>
    );
});
