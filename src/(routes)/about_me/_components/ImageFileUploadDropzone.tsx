import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineFileUpload } from 'react-icons/md';

interface Props {
    addImageFile: (file: File) => void;
}

export default function ImageFileUploadDropzone({ addImageFile }: Props) {
    const onDrop = useCallback((acceptedFile: File[]) => {
        if (acceptedFile.length === 0) {
            return;
        }
        addImageFile(acceptedFile[0]);
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        multiple: false,
        noKeyboard: true,
        noClick: true,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
        },
    });

    return (
        <div className={'my-8 flex flex-col'}>
            <span className={'mx-2.5 font-bold'}>이미지 파일 첨부</span>
            <span className={'mx-2.5 mb-2 text-sm text-red-500'}>
                .jpg, .jpeg, .png 파일만 첨부할 수 있습니다. 다른 확장자의 파일을 선택하면, 첨부되지 않습니다.
            </span>
            <div className={'relative h-64 rounded-xl border border-dashed border-rose-700'} {...getRootProps()}>
                <input {...getInputProps()} />
                <div
                    className={
                        'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-3'
                    }
                >
                    <MdOutlineFileUpload className={'h-12 w-12 text-rose-700'} />
                    <span className={'font-semibold'}>드로그 앤 드롭으로 파일 추가</span>
                    <span className={'text-sm text-gray-600'}>또는</span>
                    <button
                        type={'button'}
                        className={'rounded-2xl bg-rose-700 px-3 py-2 text-white transition-all hover:bg-rose-900'}
                        onClick={open}
                    >
                        파일 탐색
                    </button>
                </div>
            </div>
        </div>
    );
}
