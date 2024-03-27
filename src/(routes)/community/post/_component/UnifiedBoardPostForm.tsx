import axios from 'axios';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import PostInputs from '../../../../_components/boardPostAndModify/PostInputs.tsx';
import CategoryInput from '../../_components/CategoryInput';
import FileUploadDropzone from '../../../../_components/boardPostAndModify/FileUploadDropzone.tsx';
import FileList from '../../../../_components/boardPostAndModify/FlieList.tsx';

interface FormData {
    title: string;
    bodyContent: string;
    unifiedPostType: string;
}

interface FileData {
    id: string;
    file: File;
}

export default function UnifiedBoardPostForm() {
    const [fileInformation, setFileInformation] = useState<FileData[]>([]);

    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: { bodyContent: '', unifiedPostType: 'FREE' },
    });

    const addFiles = useCallback((files: File[]) => {
        const newFiles: FileData[] = files.map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFiles]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileData) => {
        setFileInformation(prevState => prevState.filter(fileInfo => fileInfo.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('data', blob);

        fileInformation.forEach(fileInfo => formData.append('file', fileInfo.file));

        try {
            await axios.post(`/api/unified-post/post`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            window.alert('게시글 저장에 성공하였습니다.');
            navigate('/community');
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
                <div className={'flex items-center justify-between'}>
                    <h1 className={'text-3xl font-semibold'}>통합 게시판 글 작성</h1>
                    <CategoryInput />
                </div>
                <div className={'my-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    <FileUploadDropzone addFiles={addFiles} />
                    <FileList fileInformation={fileInformation} onFileDeleteButtonClick={handleFileDeleteButtonClick} />
                </div>
                <div className={'flex justify-end gap-x-4'}>
                    <button
                        className={
                            'rounded-xl border border-secondary p-3 text-secondary transition-all hover:bg-rose-50'
                        }
                        type={'button'}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <span className={'font-semibold '}>취소하기</span>
                    </button>
                    <button
                        className={'rounded-xl bg-secondary p-3 text-white transition-all hover:bg-primary'}
                        type={'submit'}
                    >
                        <span className={'font-semibold'}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
