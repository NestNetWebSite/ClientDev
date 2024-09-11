import axios from 'axios';
import { useCallback, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FaRegFile } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PostInputs from '../../../../_components/boardPostAndModify/PostInputs.tsx';
import ImageFileUploadDropzone from '../../_components/ImageFileUploadDropzone';
import getSingleAboutMeBoardInfo from '../../_lib/getSingleAboutMeBoardInfo.ts';

interface FormData {
    title: string;
    bodyContent: string;
}

export default function AboutMeBoardModifyForm() {
    const navigate = useNavigate();

    const boardId = useParams().boardId;

    const { data } = useSuspenseQuery({
        queryKey: ['board', 'aboutMe', boardId],
        queryFn: getSingleAboutMeBoardInfo,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const { title, bodyContent } = data.introductionPostDto;

    const formMethods = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: { title, bodyContent },
    });

    const [imageFile, setImageFile] = useState<File>(null);

    const fileDtoList = data.fileDtoList;

    const [existingFileIdList, setExistingFileIdList] = useState(fileDtoList.length === 0 ? [] : [fileDtoList[0].id]);

    const addImageFile = useCallback((file: File) => {
        setImageFile(file);
    }, []);

    const handleFileDeleteButtonClick = useCallback(() => {
        if (existingFileIdList.length !== 0) {
            setExistingFileIdList([]);
        } else {
            setImageFile(() => null);
        }
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            if (existingFileIdList.length === 0) {
                if (imageFile === null) {
                    window.alert('프로필 사진을 추가해주세요.');
                    return;
                }
            }

            const formData = new FormData();
            const blob = new Blob(
                [
                    JSON.stringify({
                        title: data.title,
                        bodyContent: data.bodyContent,
                        id: boardId,
                    }),
                ],
                { type: 'application/json' },
            );

            formData.append('file', imageFile);
            formData.append('data', blob);

            const fileIdListBlob = new Blob([JSON.stringify(existingFileIdList)], { type: 'application/json' });
            formData.append('file-id', fileIdListBlob);

            await axios.post(`/api/introduction-post/modify`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            window.alert('수정되었습니다.');
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
                    <h1 className={'text-3xl font-semibold'}>자기소개 수정</h1>
                </div>
                <div className={'mt-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    <ImageFileUploadDropzone addImageFile={addImageFile} />
                    {(imageFile || existingFileIdList.length !== 0) && (
                        <div className={'my-8 flex flex-col'}>
                            <h1 className={'mx-2.5 mb-2 font-bold'}>첨부파일</h1>
                            <div className={'flex items-center justify-between rounded border border-gray-300 p-3'}>
                                <div className={'flex items-center gap-x-2'}>
                                    <FaRegFile className={'h-5 w-5'} />
                                    <span>{imageFile ? imageFile.name : fileDtoList[0].originalFileName}</span>
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
                        <span className={'font-semibold '}>수정하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
