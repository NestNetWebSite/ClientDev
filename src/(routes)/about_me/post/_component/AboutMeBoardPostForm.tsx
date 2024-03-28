import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FaRegFile } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PostInputs from '../../../../_components/boardPostAndModify/PostInputs.tsx';
import ImageFileUploadDropzone from '../../_components/ImageFileUploadDropzone';

interface FormData {
    title: string;
    bodyContent: string;
    image: FileList;
}

export default function AboutMeBoardPostForm() {
    const navigate = useNavigate();

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: { bodyContent: '' },
    });

    const [imageFile, setImageFile] = useState<File>(null);

    const addImageFile = useCallback((file: File) => {
        setImageFile(file);
    }, []);

    const handleFileDeleteButtonClick = useCallback(() => {
        setImageFile(() => null);
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            const formData = new FormData();
            const blob = new Blob(
                [
                    JSON.stringify({
                        title: data.title,
                        bodyContent: data.bodyContent,
                    }),
                ],
                { type: 'application/json' },
            );
            formData.append('data', blob);
            if (imageFile) {
                formData.append('file', imageFile);
            }

            await axios.post(`/api/introduction-post/post`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            window.alert('게시글 저장에 성공하였습니다.');
            navigate('/about_me');
        } catch (error) {
            // @ts-ignore
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
                    <h1 className={'text-3xl font-semibold'}>자기소개 작성</h1>
                </div>
                <div className={'mt-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    <ImageFileUploadDropzone addImageFile={addImageFile} />
                    {imageFile && (
                        <div className={'my-8 flex flex-col'}>
                            <h1 className={'mx-2.5 mb-2 font-bold'}>첨부파일</h1>
                            <div className={'flex items-center justify-between rounded border border-gray-300 p-3'}>
                                <div className={'flex items-center gap-x-2'}>
                                    <FaRegFile className={'h-5 w-5'} />
                                    <span>{imageFile.name}</span>
                                </div>
                                <button
                                    className={'box-content rounded-full p-1 transition-all hover:bg-red-100'}
                                    type={'button'}
                                    onClick={handleFileDeleteButtonClick}
                                >
                                    <RiDeleteBin6Line className={'h-6 w-6 text-red-500'} />
                                </button>
                            </div>
                        </div>
                    )}
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
                        <span className={'font-semibold '}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
