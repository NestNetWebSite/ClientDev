import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineFileUpload } from 'react-icons/md';

interface Props {
    addFiles: (files: File[]) => void;
}

export default function FileUploadDropzone({ addFiles }: Props) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        addFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noKeyboard: true, noClick: true });
    return (
        <div className={'my-8 flex flex-col'}>
            <span className={'mx-2.5 mb-2 font-bold'}>파일 첨부</span>
            <div className={'relative h-64 rounded-xl border border-dashed border-secondary'} {...getRootProps()}>
                <input {...getInputProps()} />
                <div
                    className={
                        'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-3'
                    }
                >
                    <MdOutlineFileUpload className={'h-12 w-12 text-secondary'} />
                    <span className={'font-semibold'}>드로그 앤 드롭으로 파일 추가</span>
                    <span className={'text-sm text-gray-600'}>또는</span>
                    <button
                        type={'button'}
                        className={'rounded-2xl bg-secondary px-3 py-2 text-white transition-all hover:bg-primary'}
                        onClick={open}
                    >
                        파일 탐색
                    </button>
                </div>
            </div>
        </div>
    );
}
