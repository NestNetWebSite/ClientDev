import { PiFile, PiDownloadSimple } from 'react-icons/pi';

interface Props {
    originalFileName: string;
    saveFileName: string;

    onFileDownloadButtonClick(originalFileName: string, saveFileName: string): Promise<void>;
}

export default function File({ originalFileName, saveFileName, onFileDownloadButtonClick }: Props) {
    return (
        <li className={'flex w-[27rem] items-center rounded-2xl border border-gray-200 px-3 py-3 shadow'}>
            <PiFile className={'mx-2 h-6 w-6'} />
            <p className={'flex-1 text-[0.95rem] font-semibold'}>{originalFileName}</p>
            <button
                className={'mx-3 p-2 duration-300 hover:rounded-full hover:bg-gray-100'}
                type={'button'}
                onClick={() => {
                    onFileDownloadButtonClick(originalFileName, saveFileName).catch(error => window.alert(error));
                }}
            >
                <PiDownloadSimple className={'h-7 w-7'} />
            </button>
        </li>
    );
}
