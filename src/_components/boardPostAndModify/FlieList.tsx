import { FaRegFile } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface FileData {
    id: string | number;
    file: File | { name: string };
    isOriginal?: boolean;
}

interface Props {
    fileInformation: FileData[];
    onFileDeleteButtonClick: (targetFileData: FileData) => void;
}

export default function FileList({ fileInformation, onFileDeleteButtonClick }: Props) {
    return (
        <>
            {fileInformation.length !== 0 && (
                <div className={'my-8 flex flex-col'}>
                    <h1 className={'mx-2.5 mb-2 font-bold'}>첨부파일 목록</h1>
                    <ul className={'scrollbar-hide flex h-64 w-full flex-col gap-y-3 overflow-y-auto'}>
                        {fileInformation.map(fileData => {
                            return (
                                <li className={'flex items-center justify-between rounded border border-gray-300 p-3'}>
                                    <div className={'flex items-center gap-x-2'}>
                                        <FaRegFile className={'h-5 w-5'} />
                                        <span>{fileData.file.name}</span>
                                    </div>
                                    <button
                                        className={'box-content rounded-full p-1 transition-all hover:bg-red-100'}
                                        type={'button'}
                                        onClick={() => {
                                            onFileDeleteButtonClick(fileData);
                                        }}
                                    >
                                        <RiDeleteBin6Line className={'h-6 w-6 text-red-500'} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
