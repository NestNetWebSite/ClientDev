import axios from 'axios';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ExamInfoInputs from '../../_components/ExamInfoInputs.tsx';
import PostInputs from '../../../../_components/boardPostAndModify/PostInputs.tsx';
import FileUploadDropzone from '../../../../_components/boardPostAndModify/FileUploadDropzone.tsx';
import FileList from '../../../../_components/boardPostAndModify/FlieList.tsx';

interface FormData {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    title: string;
    bodyContent: string;
}

interface FileData {
    id: string;
    file: File;
}

export default function ExamBoardPostForm() {
    const [fileInformation, setFileInformation] = useState<FileData[]>([]);

    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: { bodyContent: '', year: new Date().getFullYear() },
    });

    const addFiles = useCallback((files: File[]) => {
        const newFiles: FileData[] = files.map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFiles]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileData: FileData) => {
        setFileInformation(prevState => prevState.filter(fileData => fileData.id !== targetFileData.id));
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        data.semester = Number(data.semester);
        try {
            const formData = new FormData();
            const blob = new Blob([JSON.stringify({ ...data, postCategory: 'EXAM' })], { type: 'application/json' });

            formData.append('data', blob);
            fileInformation.forEach(fileInfo => formData.append('file', fileInfo.file));

            await axios.post(`/api/exam-collection-post/post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            window.alert('게시글 저장에 성공하였습니다.');
            navigate('/exam');
        } catch (error) {
            const errorMessage = error.response.data.error.message;
            window.alert(errorMessage);
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[50rem] flex-col py-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div>
                    <h1 className={'text-3xl font-semibold'}>족보 게시판 글 작성</h1>
                </div>
                <div className={'my-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    <ExamInfoInputs />
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
                        <span className={'font-semibold '}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
