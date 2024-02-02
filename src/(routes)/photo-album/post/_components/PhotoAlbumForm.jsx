import TitleInput from './TitleInput';
import DescriptionInput from './DescriptionInput';
import FileInput from './FileInput';
import PostButton from './PostButton';
import { ORIGINAL_FILE_FLAG } from '../../../../_constants/constants';
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * 앨범 작성 폼 컴포넌트 => 작성, 수정에 모두 사용
 * @param {boolean}
 * @returns
 */
export default function PhotoAlbumForm({ isModifying }) {
    // 수정시 게시물 postId, Id List(기존 파일들의 아이디만 포함) 필요
    const { postId } = useParams();
    const [existingPhotoIds, setExistingPhotoIds] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const [uploadFiles, setUploadFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [bodyContent, setBodyContent] = useState('');
    const [isPostBtnDisabled, setIsPostBtnDisabled] = useState(true);

    // 폼 제출 핸들러
    const handleFormSubmit = event => {
        event.preventDefault();
        const formData = new FormData();

        // REST: 수정시
        if (isModifying) {
            // 기존 게시물아이디, 제목, 본문 삽입
            const metaData = {
                id: postId,
                title,
                bodyContent,
            };
            // Blob로 변환 후 폼데이터에 삽입
            const metaDataBlob = new Blob([JSON.stringify(metaData)], {
                type: 'application/json',
            });
            formData.append('data', metaDataBlob);
            const existingPhotoIdsBlob = new Blob([JSON.stringify(existingPhotoIds)], {
                type: 'application/json',
            });
            formData.append('file-id', existingPhotoIdsBlob);

            // 기존 사진이 아닌 경우에만 전송할 파일 리스트에 추가
            uploadFiles.forEach(uploadFile => {
                // @@@@@@@@@테스트 필요
                if (!Object.prototype.hasOwnProperty.call(uploadFile, ORIGINAL_FILE_FLAG)) {
                    formData.append('file', uploadFile.photoFile);
                }
            });

            axios
                ?.post(`${import.meta.env.VITE_APP_SERVER}/photo-post/modify`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                ?.then(() => navigate(`/gallery`))
                ?.catch(() => {
                    alert('게시물 수정에 실패하였습니다.');
                    navigate(`/gallery`);
                });
        }

        // REST: 수정 아닌 작성시
        if (!isModifying) {
            // 작성된 제목, 본문을 담은 객체
            const metaData = {
                title,
                bodyContent,
            };

            // Blob로 변환 후 폼데이터에 삽입
            const metaDataBlob = new Blob([JSON.stringify(metaData)], {
                type: 'application/json',
            });
            formData.append('data', metaDataBlob);
            uploadFiles.forEach(uploadFile => formData.append('file', uploadFile.photoFile));

            axios
                ?.post(`${import.meta.env.VITE_APP_SERVER}/photo-post/post`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                ?.then(() => navigate('/gallery'))
                ?.catch(() => {
                    alert('게시물 등록에 실패하였습니다.');
                    navigate(`/gallery`);
                });
        }
    };

    // 저장 및 수정 버튼 활성화 여부 판단
    useEffect(() => {
        setIsPostBtnDisabled(
            uploadFiles?.length === 0 || title?.trim().length === 0 || bodyContent?.trim().length === 0,
        );
    }, [isPostBtnDisabled, uploadFiles, title, bodyContent]);

    // 수정시 기존 앨범 정보 주입
    useEffect(() => {
        if (isModifying) {
            const { title: prevTitle, bodyContent: prevBodyContent } = location.state.photoPostDto;
            const prevFiles = location.state.fileDtoList;
            setUploadFiles(prevFiles);
            setTitle(prevTitle);
            setBodyContent(prevBodyContent);
            setExistingPhotoIds(prevFiles.map(file => file.id));
        }
    }, []);

    return (
        <div
            className={`FormWrapper h-[40rem] w-[42rem] rounded-3xl bg-white
                   p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
        >
            <form className='h-full' onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <div className={'flex h-full w-full flex-row'}>
                    <FileInput
                        uploadFiles={uploadFiles}
                        setUploadFiles={setUploadFiles}
                        existingPhotoIds={existingPhotoIds}
                        setExistingPhotoIds={setExistingPhotoIds}
                        isModifying={isModifying}
                    />
                    <div className={'ml-5 flex w-1/2 flex-col justify-center'}>
                        <TitleInput title={title} setTitle={setTitle} />
                        <DescriptionInput bodyContent={bodyContent} setBodyContent={setBodyContent} />
                        <div className={'flex justify-end'}>
                            <PostButton isPostBtnDisabled={isPostBtnDisabled} isModifying={isModifying} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
