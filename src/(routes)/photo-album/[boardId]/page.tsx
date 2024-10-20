// PAGE: 사진게시판 게시물 상세
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SelectedPhoto from './_components/SelectedPhoto';
import UnselectedPhotos from './_components/UnselectedPhotos';
import PhotoAlbumMetadata from './_components/PhotoAlbumMetadata';
import CommentPostForm from './_components/CommentPostForm';
import DownloadBtn from './_components/DownloadBtn';
import ModifyBtn from './_components/ModifyBtn';
import DeleteBtn from './_components/DeleteBtn';
import LikeBtn from './_components/LikeBtn';
import MetadataBtn from './_components/MetadataBtn';
import { IPhotoPostDto, IExistingFileDto, ICommentDto } from '../types';

interface PhotoAlbumData {
    photoPostDto: IPhotoPostDto;
    fileDtoList: IExistingFileDto[];
    commentDtoList: ICommentDto[];
    memberLiked: boolean;
}

export default function Page() {
    // 선택된 사진의 url
    const [selectedPhoto, setSelectedPhoto] = useState<IExistingFileDto>(null);
    const [photos, setPhotos] = useState<IExistingFileDto[]>([]);
    // 메타데이터(댓글 정보 포함) 표시 여부
    const [isMetadataVisible, setIsMetadataVisible] = useState(false);
    const { data: albumData, isLoading: isAlbumLoading, status } = useGetAlbum();

    // 요청 성공시 사진 배열 첫번째 요소를 선택된 사진(현재 보고 있는 사진)으로 지정
    useEffect(() => {
        if (status === 'success') {
            setPhotos(albumData.fileDtoList);
            setSelectedPhoto(albumData.fileDtoList[0]);
        }
    }, [status, albumData]);

    return (
        <div className='AlbumWrapper max-w-screen h-[calc(100vh-4.68rem)]'>
            <div className='MainView flex h-full flex-row justify-between'>
                <div className='LeftMainView w-1/4 min-w-[12rem]'>{/* 사이드바 */}</div>
                {/* 선택된 사진 및 댓글창 */}
                <div className='CenterMainView w-2/4 min-w-[50rem] overflow-y-auto pl-10'>
                    <div className='flex flex-row'>
                        <div className='relative m-auto flex w-[38rem] flex-col items-center'>
                            <div
                                className={`SelectedPhotoContainer mt-4 ${selectedPhoto ? 'h-max w-fit' : 'h-[28rem] w-full'} ${
                                    isMetadataVisible ? 'rounded-t-2xl' : 'rounded-2xl'
                                } overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
                            >
                                <SelectedPhoto selectedPhoto={selectedPhoto} />
                            </div>
                            {isAlbumLoading ? null : (
                                <>
                                    <div className='flex h-fit w-full flex-col bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                                        <PhotoAlbumMetadata
                                            isMetadataVisible={isMetadataVisible}
                                            postMetaData={albumData.photoPostDto}
                                            comments={albumData.commentDtoList}
                                        />
                                    </div>
                                    <CommentPostForm isMetadataVisible={isMetadataVisible} />
                                </>
                            )}
                        </div>
                        <div className='ActionBtnBanner w-[5rem]'>
                            {isAlbumLoading ? null : (
                                <div className='flex-start mt-8 flex h-full flex-col items-center gap-3 pr-3'>
                                    <DownloadBtn selectedPhoto={selectedPhoto} />
                                    <MetadataBtn setIsMetadataVisible={setIsMetadataVisible} />
                                    <LikeBtn
                                        isMemberLiked={albumData.memberLiked}
                                        likeCount={albumData.photoPostDto.likeCount}
                                    />
                                    {/* 권한자에게만 보이는 버튼 */}
                                    {albumData.photoPostDto.memberWritten ? (
                                        <>
                                            <ModifyBtn />
                                            <DeleteBtn />
                                        </>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* 선택되지 않은 사진 목록 */}
                <div className='RightMainView relative w-1/4'>
                    <div className='ml-auto h-full w-[20rem] min-w-[20rem] max-w-[20rem] overflow-y-scroll px-12 pr-14 pt-5'>
                        <UnselectedPhotos photos={photos} setSelectedPhoto={setSelectedPhoto} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// REST: 앨범 단건 조회
const useGetAlbum = () => {
    const { boardId } = useParams<{ boardId: string }>();

    return useQuery<PhotoAlbumData>({
        queryKey: ['album', boardId],
        queryFn: async () => {
            const albumURL = `/api/photo-post/${boardId}`;

            return await axios.get(albumURL, { withCredentials: true }).then(res => {
                return res.data.response;
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: true,
    });
};
