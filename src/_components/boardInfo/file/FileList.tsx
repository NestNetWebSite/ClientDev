import axios from 'axios';
import { useCallback } from 'react';
import File from './File';

interface FileData {
    id: number;
    originalFileName: string;
    saveFileName: string;
}

export default function FileList({ files }: { files: FileData[] }) {
    const handleFileDownloadButtonClick = useCallback(async (originalFileName: string, saveFileName: string) => {
        const boardId = window.location.pathname.split('/')[2];
        const result = await axios
            .get(`/api/file/${boardId}/${saveFileName}`, {
                responseType: 'blob',
            })
            .then(response => response.data);
        const blob = new Blob([result], {
            type: 'application/octet-stream',
        });
        const objectUrl = URL.createObjectURL(blob);
        const $aElement = document.createElement('a');

        $aElement.download = originalFileName;
        $aElement.href = objectUrl;
        $aElement.hidden = true;

        $aElement.click();
        $aElement.remove();

        URL.revokeObjectURL(objectUrl);
    }, []);

    return (
        files.length !== 0 && (
            <>
                <h1 className={'mx-2 mb-4 text-base font-semibold'}>첨부파일 목록</h1>
                <ul className={'mb-9 flex flex-col gap-y-6'}>
                    {files.map(file => {
                        return (
                            <File
                                key={file.id}
                                originalFileName={file.originalFileName}
                                saveFileName={file.saveFileName}
                                onFileDownloadButtonClick={handleFileDownloadButtonClick}
                            />
                        );
                    })}
                </ul>
            </>
        )
    );
}
