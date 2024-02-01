import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, NoticeBoardData } from '../types';

interface NoticeBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    noticePostDto: NoticeBoardData;
}

const getSingleNoticeBoardInfo: QueryFunction<NoticeBoardInfo, [_1: string, _2: string, _3: string]> = ({
    queryKey,
}) => {
    const boardId = queryKey[2];
    return axios.get(`/api/notice-post/${boardId}`).then(response => response.data.response);
};

export default getSingleNoticeBoardInfo;
