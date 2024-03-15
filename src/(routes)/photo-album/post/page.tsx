import PhotoAlbumForm from '../_components/PhotoAlbumForm';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUploadedFileDto } from '../types';
import { PAGE_ROUTE } from '../../../_constants/constants';
import { IPhotoAlbumDescriptionValues } from '../types';
import { SubmitHandler } from 'react-hook-form';

// 앨범 작성 페이지
export default function Page() {
    const [files, setFiles] = useState<IUploadedFileDto[]>([]);

    const navigate = useNavigate();
    // 폼 제출 핸들러
    const handlePostFormSubmit: SubmitHandler<IPhotoAlbumDescriptionValues> = async data => {
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
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            ?.then(() => navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`))
            ?.catch(error => {
                let errorMessage = '';
                if (error.response.status === 403) {
                    errorMessage = '권한이 없는 사용자입니다';
                    window.alert(errorMessage);
                    navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
                } else if (error.response.status === 401) {
                    errorMessage = '다시 로그인 해주세요.';
                    window.alert(errorMessage);
                    navigate(`/signin`);
                } else if (error.response.status === 500) {
                    errorMessage = '게시물 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                    window.alert(errorMessage);
                    navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
                }
            });
    };

    return (
        <main className='overflow-auto'>
            <div className='absolute left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 py-6 pt-[43rem]'>
                <PhotoAlbumForm files={files} setFiles={setFiles} onSubmit={handlePostFormSubmit} />
            </div>
        </main>
    );
}
