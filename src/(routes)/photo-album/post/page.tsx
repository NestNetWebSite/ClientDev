import PhotoAlbumForm from '../_components/PhotoAlbumForm';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUploadedFileDto } from '../types';
import { TIME_OUT, PAGE_ROUTE } from '../../../_constants/constants';
import { IPhotoAlbumDescriptionValues } from '../types';
import { SubmitHandler } from 'react-hook-form';
import isServerError from '../../../_errors/isServerError';

// 앨범 작성 페이지
export default function Page() {
    const [files, setFiles] = useState<IUploadedFileDto[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);

    const navigate = useNavigate();
    // 폼 제출 핸들러
    const handlePostFormSubmit: SubmitHandler<IPhotoAlbumDescriptionValues> = async data => {
        if (files.length === 0) {
            alert('사진 첨부는 필수입니다!');
            return;
        }
        setIsPending(true);
        const formData = new FormData();

        // Blob로 변환 후 폼데이터에 삽입
        const descriptionBlob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });
        formData.append('data', descriptionBlob);
        files.forEach(file => formData.append('file', file.file));

        // CREATE
        axios
            ?.post(`/api/photo-post/post`, formData, {
                timeout: TIME_OUT,
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            ?.then(() => navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`))
            ?.catch(e => {
                let errorMessage = '';
                if (e.code === 'ECONNABORTED') {
                    errorMessage = '요청시간을 초과하였습니다.';
                    alert(errorMessage);
                    return;
                }
                if (e.message === 'Network Error') {
                    errorMessage = '네트워크 에러!';
                    alert(errorMessage);
                    return;
                }
                if (isServerError(e) && e.response.data && e?.response?.data?.error.message) {
                    errorMessage = e.response.data.error.message;
                    alert(errorMessage);
                    return;
                }
                if (e.response.status === 403) {
                    errorMessage = '권한이 없는 사용자입니다';
                } else if (e.response.status === 401) {
                    errorMessage = '로그인 후 다시 시도해주세요.';
                } else if (e.response.status === 500) {
                    errorMessage = '게시물 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                }
                alert(errorMessage);
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    return (
        <main className='overflow-auto'>
            <div className='absolute left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 py-6 pt-[43rem]'>
                <PhotoAlbumForm
                    files={files}
                    setFiles={setFiles}
                    onSubmit={handlePostFormSubmit}
                    isPending={isPending}
                />
            </div>
        </main>
    );
}
