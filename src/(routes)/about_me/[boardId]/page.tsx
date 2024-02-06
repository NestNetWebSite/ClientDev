import axios from 'axios';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import getSingleAboutMeBoardInfo from '../_lib/getSingleAboutMeBoardInfo.ts';
import BoardHeader from '../../../_components/boardInfo/header/BoardHeader';
import BoardBody from '../../../_components/boardInfo/body/BoardBody';
import BoardLikeButton from '../../../_components/boardInfo/BoardLikeButton';
import { FaRegComments } from 'react-icons/fa';
import CommentPostForm from '../../../_components/boardInfo/comment/CommentPostForm';
import CommentList from '../../../_components/boardInfo/comment/CommentList';

export default function Page() {
    const navigate = useNavigate();

    const boardId = useParams().boardId;

    const { data, isLoading } = useQuery({
        queryKey: ['board', 'aboutMe', boardId],
        queryFn: getSingleAboutMeBoardInfo,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: true,
    });

    const handleModifyTextClick = useCallback(() => {
        navigate(`/api/about_me/modify/${boardId}`);
    }, []);

    const handleDeleteTextClick = useCallback(() => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`/api/post/delete?postId=${boardId}`)
                .then(() => {
                    navigate('/about_me');
                })
                .catch(error => {
                    // @ts-ignore
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
                        title={data.introductionPostDto.title}
                        username={data.introductionPostDto.username}
                        viewCount={data.introductionPostDto.viewCount}
                        likeCount={data.introductionPostDto.likeCount}
                        createdTime={data.introductionPostDto.createdTime}
                        modifiedTime={data.introductionPostDto.modifiedTime}
                        onModifyTextClick={handleModifyTextClick}
                        onDeleteTextClick={handleDeleteTextClick}
                        memberWritten={data.introductionPostDto.memberWritten}
                        memberLoginId={data.introductionPostDto.memberLoginId}
                    />
                    {data.fileDtoList[0] && (
                        <img
                            className={'w-3/4'}
                            src={`/api/image/${data.fileDtoList[0].saveFilePath}/${data.fileDtoList[0].saveFileName}`}
                            alt={data.fileDtoList[0].saveFileName}
                        />
                    )}
                    <BoardBody bodyContent={data.introductionPostDto.bodyContent} />
                    <div className={'mb-9 flex justify-center'}>
                        <BoardLikeButton
                            boardId={boardId}
                            isMemberLiked={data.memberLiked}
                            likeCount={data.introductionPostDto.likeCount}
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
