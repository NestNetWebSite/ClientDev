import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { StringCombinator } from '../../../_utils/StringCombinator';
import SelectedPhoto from './_components/SelectedPhoto';
import UnselectedPhotos from './_components/UnselectedPhotos';
import PhotoAlbumMetadata from './_components/PhotoAlbumMetadata';
import CommentPostForm from './_components/CommentPostForm';
import DownloadBtn from './_components/DownloadBtn';
import ModifyBtn from './_components/ModifyBtn';
import DeleteBtn from './_components/DeleteBtn';
import LikeBtn from './_components/LikeBtn';
import MetadataBtn from './_components/MetadataBtn';

/**
 * 앨범 페이지
 * @returns
 */
export default function Page() {
    // 선택된 사진의 url
    const [selectedPhoto, setSelectedPhoto] = useState('');

    // 메타데이터(댓글 정보 포함) 표시 여부
    const [isMetadataVisible, setIsMetadataVisible] = useState(false);

    const { data: originalData = {}, isLoading: isAlbumLoading, status } = useGetAlbum();
    const {
        photoPostDto: postMetaData = {},
        fileDtoList: fileData = [],
        commentDtoList: commentData = [],
        memberLiked: isMemberLiked,
    } = originalData;

    // 요청 성공시 사진 배열 첫번째 요소를 선택된 사진(현재 보고 있는 사진)으로 지정
    useEffect(() => {
        if (status === 'success') {
            setSelectedPhoto(StringCombinator.getImageURL(fileData[0]));
        }
    }, [status, fileData, postMetaData]);

    return (
        <div className='AlbumWrapper max-w-screen bg-home-background pt-[6rem]'>
            <div className='MainView flex flex-row justify-between'>
                <div className='LeftMainView w-1/4 min-w-[12rem]'>{/* 사이드바 */}</div>
                <div className='CenterMainView h-[calc(100vh-6rem)] w-2/4 min-w-[50rem] overflow-y-auto pl-10'>
                    <div className='flex flex-row'>
                        <div className='relative m-auto flex w-[40rem] flex-col items-center'>
                            <div
                                className={`SelectedPhotoContainer mt-4 w-[40rem] ${
                                    selectedPhoto ? 'h-max' : 'h-screen'
                                } ${
                                    isMetadataVisible ? 'rounded-t-2xl' : 'rounded-2xl'
                                } overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
                            >
                                <SelectedPhoto selectedPhoto={selectedPhoto} />
                            </div>
                            <div className='flex h-fit w-full flex-col bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                                <PhotoAlbumMetadata
                                    isMetadataVisible={isMetadataVisible}
                                    postMetaData={postMetaData}
                                    comments={commentData}
                                />
                            </div>
                            <CommentPostForm isMetadataVisible={isMetadataVisible} />
                        </div>
                        <div className='ActionBtnBanner w-[5rem]'>
                            {isAlbumLoading ? null : (
                                <div className='flex-start mt-8 flex h-full flex-col items-center gap-3 pr-3'>
                                    <DownloadBtn selectedPhoto={selectedPhoto} />
                                    <MetadataBtn setIsMetadataVisible={setIsMetadataVisible} />
                                    <LikeBtn isMemberLiked={isMemberLiked} likeCount={postMetaData?.likeCount} />
                                    {/* 권한자에게만 보이는 버튼 */}
                                    {postMetaData?.memberWritten ? (
                                        <>
                                            <ModifyBtn existingData={originalData} />
                                            <DeleteBtn />
                                        </>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='RightMainView relative w-1/4'>
                    <div className='ml-auto h-[calc(100vh-6rem)] w-[20rem] min-w-[20rem] max-w-[20rem] overflow-y-scroll px-12 pr-14 pt-5'>
                        <UnselectedPhotos
                            isAlbumLoading={isAlbumLoading}
                            photos={fileData}
                            setSelectedPhoto={setSelectedPhoto}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// REST: 앨범 단건 조회
const useGetAlbum = () => {
    const { boardId } = useParams();

    return useQuery({
        queryKey: ['album', boardId],
        queryFn: async () => {
            const albumURL = `/api/photo-post/${boardId}`;
            return await axios.get(albumURL).then(res => {
                return res.data.response;
            });
        },
    });
};
