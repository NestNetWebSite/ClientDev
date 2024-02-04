import axios from 'axios';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import getSingleUnifiedBoardInfo from '../_lib/getSingleUnifiedBoardInfo.ts';
import BoardHeader from '../../../_components/boardInfo/header/BoardHeader';
import BoardBody from '../../../_components/boardInfo/body/BoardBody';
import FileList from '../../../_components/boardInfo/file/FileList';
import BoardLikeButton from '../../../_components/boardInfo/BoardLikeButton';
import { FaRegComments } from 'react-icons/fa';
import CommentPostForm from '../../../_components/boardInfo/comment/CommentPostForm';
import CommentList from '../../../_components/boardInfo/comment/CommentList';
export default function Page() {
    const navigate = useNavigate();

    const boardId = useParams().boardId;

    const { data, isLoading } = useQuery({
        queryKey: ['board', 'unified', boardId],
        queryFn: getSingleUnifiedBoardInfo,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: true,
    });

    const handleModifyTextClick = useCallback(() => {
        navigate(`/community/modify/${boardId}`);
    }, []);

    const handleDeleteTextClick = useCallback(() => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`/api/post/delete?postId=${boardId}`)
                .then(() => {
                    navigate('/community');
                })
                .catch(error => {
                    const errorMessage = error.response.data.error.message;
                    window.alert(errorMessage);
                });
        }
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        data && (
            <div className={'mx-auto mt-5 flex w-[50rem] flex-col p-8'}>
                <div className={'flex flex-col'}>
                    <BoardHeader
                        title={data.unifiedPostDto.title}
                        username={data.unifiedPostDto.userName}
                        viewCount={data.unifiedPostDto.viewCount}
                        likeCount={data.unifiedPostDto.likeCount}
                        createdTime={data.unifiedPostDto.createdTime}
                        modifiedTime={data.unifiedPostDto.modifiedTime}
                        onModifyTextClick={handleModifyTextClick}
                        onDeleteTextClick={handleDeleteTextClick}
                        memberWritten={data.unifiedPostDto.memberWritten}
                    />
                    <BoardBody bodyContent={data.unifiedPostDto.bodyContent} />
                    <FileList files={data.fileDtoList} />
                    <div className={'mb-9 flex justify-center'}>
                        <BoardLikeButton
                            boardId={boardId}
                            isMemberLiked={data.memberLiked}
                            likeCount={data.unifiedPostDto.likeCount}
                        />
                    </div>
                    <hr />
                    <div>
                        <div className={'mt-8 flex items-center'}>
                            <h4 className={'mx-2 text-lg font-bold'}>댓글</h4>
                            <FaRegComments className={'mx-1 h-6 w-6'} />
                        </div>
                        <CommentPostForm boardId={boardId} />
                        <CommentList comments={data.commentDtoList} />
                    </div>
                </div>
            </div>
        )
    );
}
