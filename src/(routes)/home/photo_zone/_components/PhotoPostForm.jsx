import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { TbCameraSelfie } from 'react-icons/tb';
import axios from 'axios';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';

/**
 * 사진 업로드
 * @returns
 */
export default function PhotoPostForm() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No selected file');
    const fileInputRef = useRef();

    const { mutate: createPhoto, isPending: isPhotoPending, isError } = usePostPhoto();

    // 사진 등록
    const handlePhotoCreate = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        createPhoto(formData);
    };

    if (isError) {
        window.alert('사진 등록 실패');
    }

    return (
        <form
            encType='multipart/form-data'
            onClick={() => {
                fileInputRef.current.value = null;
                fileInputRef.current.click();
            }}
            onSubmit={handlePhotoCreate}
            className='h-fit'
        >
            <input
                disabled={isPhotoPending}
                ref={fileInputRef}
                className=' hidden h-full w-full'
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={({ target: { files } }) => {
                    if (files[0]) {
                        setFileName(files[0].name);
                        setFile(files[0]);
                    }
                }}
            />
            {/* 상호작용 버튼 */}
            <div className='flex h-fit flex-row gap-1'>
                <div
                    className={`${
                        file ? 'bg-primary' : 'bg-white'
                    } flex w-fit flex-row items-center justify-evenly rounded-lg
            border-2 border-primary p-[0.7rem] font-semibold text-primary shadow-md hover:cursor-pointer`}
                >
                    {file ? (
                        <>
                            <span className='mx-1 w-fit max-w-[20rem] truncate text-white'>{fileName}</span>
                        </>
                    ) : (
                        <>
                            <TbCameraSelfie size={24} />
                        </>
                    )}
                </div>
                {file ? (
                    <>
                        {/* 업로드 확정 */}
                        <button
                            onClick={e => e.stopPropagation()}
                            className='w-fit rounded-lg border-2 border-primary bg-white px-2 text-primary'
                        >
                            {isPhotoPending ? <LoadingSpinner size={20} /> : <FaCloudUploadAlt size={20} />}
                        </button>
                        {/* 업로드 취소 */}
                        <button
                            disabled={isPhotoPending}
                            className='w-fit rounded-lg bg-primary px-2 text-white'
                            onClick={event => {
                                event.stopPropagation();
                                setFileName(null);
                                setFile(null);
                            }}
                        >
                            <MdOutlineCancel size={18} />
                        </button>
                    </>
                ) : null}
            </div>
        </form>
    );
}

// REST: 사진 등록
function usePostPhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async fileFormData => {
            const photoZoneURL = `/api/life4cut/save`;
            return await axios.post(photoZoneURL, fileFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['photo-zone']);
        },
        onError: () => {
            console.log('포토존 에러');
        },
    });
}
