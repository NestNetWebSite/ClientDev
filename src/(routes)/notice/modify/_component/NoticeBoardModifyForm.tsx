import { useCallback, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import axios from 'axios';
import getSingleNoticeBoardInfo from '../../_lib/getSingleNoticeBoardInfo.ts';
import PostInputs from '../../../../_components/boardPostAndModify/PostInputs.tsx';
import FileUploadDropzone from '../../../../_components/boardPostAndModify/FileUploadDropzone.tsx';
import FileList from '../../../../_components/boardPostAndModify/FlieList.tsx';

interface FormData {
    title: string;
    bodyContent: string;
}

interface FileData {
    id: string | number;
    file: File | { name: string };
    isOriginal?: boolean;
}

export default function NoticeBoardModifyForm() {
    const navigate = useNavigate();

    const boardId = useParams().boardId;

    const { data } = useSuspenseQuery({
        queryKey: ['board', 'notice', boardId],
        queryFn: getSingleNoticeBoardInfo,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const { title, bodyContent } = data.noticePostDto;

    const existingFileData = data.fileDtoList;

    const [fileInformation, setFileInformation] = useState<FileData[]>(
        existingFileData.map(file => ({
            file: { name: file.originalFileName },
            id: file.id,
            isOriginal: true,
        })),
    );

    const [existingFileIdList, setExistingFileIdList] = useState<number[]>(existingFileData.map(file => file.id));

    const formMethods = useForm<FormData>({ mode: 'onBlur', defaultValues: { title, bodyContent } });

    const addFiles = useCallback((files: File[]) => {
        const newFiles: FileData[] = files.map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFiles]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileData) => {
        if ('isOriginal' in targetFileInfo) {
            setExistingFileIdList(prevState => prevState.filter(id => id !== targetFileInfo.id));
        }
        setFileInformation(prevState => prevState.filter(fileData => fileData.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify({ ...data, id: boardId })], { type: 'application/json' });
        formData.append('data', blob);

        const addedFileInformation = fileInformation.filter(fileData => !('isOriginal' in fileData));
        if (addedFileInformation.length === 0) {
            formData.append('file', JSON.stringify([]));
        } else {
            addedFileInformation.forEach(fileData => {
                if (fileData.file instanceof File) {
                    formData.append('file', fileData.file);
                }
            });
        }

        const fileIdListBlob = new Blob([JSON.stringify(existingFileIdList)], { type: 'application/json' });
        formData.append('file-id', fileIdListBlob);
        try {
            await axios.post(`/api/notice-post/modify`, formData, {
                withCredentials: true,
                headers: { Authorization: localStorage.getItem('access_token'), 'Content-Type': 'multipart/form-data' },
            });
            window.alert('수정되었습니다.');
            navigate(`/notice/${boardId}`, { replace: true });
        } catch (error) {
            let errorMessage = '';
            if (error.response.status === 403) {
                errorMessage = error.response.data;
            } else {
                errorMessage = error.response.data.error.message;
            }
            window.alert(errorMessage);
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[50rem] flex-col py-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div>
                    <h1 className={'text-3xl font-semibold'}>공지사항 작성</h1>
                </div>
                <div className={'mt-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    <FileUploadDropzone addFiles={addFiles} />
                    <FileList fileInformation={fileInformation} onFileDeleteButtonClick={handleFileDeleteButtonClick} />
                </div>
                <div className={'flex justify-end gap-x-4'}>
                    <button
                        className={
                            'rounded-xl border border-rose-800 p-3 text-rose-800 transition-all hover:bg-rose-50'
                        }
                        type={'button'}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <span className={'font-semibold '}>취소하기</span>
                    </button>
                    <button
                        className={'rounded-xl bg-rose-800 p-3 text-white transition-all hover:bg-rose-900'}
                        type={'submit'}
                    >
                        <span className={'font-semibold '}>수정하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
