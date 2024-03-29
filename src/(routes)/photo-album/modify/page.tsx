import PhotoAlbumForm from '../_components/PhotoAlbumForm';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { IPhotoPostDto, IExistingFileDto, IUploadedFileDto, IPhotoAlbumDescriptionValues } from '../types';
import { PAGE_ROUTE } from '../../../_constants/constants';
import { SubmitHandler } from 'react-hook-form';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner';

interface IExistingData {
    photoPostDto: IPhotoPostDto;
    fileDtoList: IExistingFileDto[];
}

// 앨범 수정 페이지
export default function Page() {
    const { boardId } = useParams<string>();
    const navigate = useNavigate();

    const [files, setFiles] = useState<(IExistingFileDto | IUploadedFileDto)[]>([]);

    // 수정시 게시물 boardId, Id List(기존 파일들의 아이디만 포함) 필요
    const [existingFileIds, setExistingFileIds] = useState<number[]>([]);
    // ON-MOUNT: 수정시 기존 앨범 정보 주입
    const { data: existingData, isFetching: isExistingDataFetching } = useGetAlbum(boardId);
    // const { photoPostDto: existingPostData, fileDtoList: existingFileData } = existingData;
    useEffect(() => {
        setFiles(existingData?.fileDtoList);
        setExistingFileIds(existingData?.fileDtoList.map(file => file.id));
    }, [existingData]);

    // 수정 폼 제출 핸들러
    const handleModifiedFormSubmit: SubmitHandler<IPhotoAlbumDescriptionValues> = data => {
        if (files.length === 0) {
            alert('사진 첨부는 필수입니다!');
            return;
        } else {
            const formData = new FormData();

            // Blob로 변환 후 폼데이터에 삽입
            const descriptionBlob = new Blob([JSON.stringify({ ...data, id: boardId })], {
                type: 'application/json',
            });
            formData.append('data', descriptionBlob);
            const existingFileIdsBlob = new Blob([JSON.stringify(existingFileIds)], {
                type: 'application/json',
            });
            formData.append('file-id', existingFileIdsBlob);

            // 기존 사진이 아닌 경우에만 전송할 파일 리스트에 추가
            files?.forEach((file: IExistingFileDto | IUploadedFileDto) => {
                // if (!Object.prototype.hasOwnProperty.call(file, ORIGINAL_FILE_FLAG)) {
                //     formData.append('file', file);
                // }
                if ('file' in file) {
                    formData.append('file', file.file);
                }
            });

            // REST
            axios
                .post(`/api/photo-post/modify`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(() => navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`))
                .catch(error => {
                    let errorMessage = '';
                    if (error.response.status === 403) {
                        errorMessage = '권한이 없는 사용자입니다';
                        alert(errorMessage);
                        navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
                    } else if (error.response.status === 401) {
                        errorMessage = '다시 로그인 해주세요.';
                        alert(errorMessage);
                        navigate(`/signin`);
                    } else if (error.response.status === 500) {
                        errorMessage = '게시물 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                        alert(errorMessage);
                        navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
                    }
                });
        }
    };

    return (
        <main className='w-full'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-10'>
                {isExistingDataFetching ? (
                    <div className='flex h-full flex-row items-center'>
                        <LoadingSpinner size={24} />
                        <h1>기존 정보를 불러오는 중입니다.</h1>
                    </div>
                ) : (
                    <PhotoAlbumForm
                        files={files}
                        setFiles={setFiles}
                        existingPostData={existingData?.photoPostDto}
                        existingFileIds={existingFileIds}
                        setExistingFileIds={setExistingFileIds}
                        onSubmit={handleModifiedFormSubmit}
                    />
                )}
            </div>
        </main>
    );
}

// REST: 앨범 단건 조회
const useGetAlbum = (boardId: string) => {
    return useQuery<IExistingData>({
        queryKey: ['album', boardId],
        queryFn: async () => {
            const albumURL = `/api/photo-post/${boardId}`;
            return await axios.get(albumURL).then(res => {
                return res.data.response;
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
};
