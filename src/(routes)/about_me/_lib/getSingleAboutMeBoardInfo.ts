import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, AboutMeBoardData } from '../types';

interface AboutMeBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    introductionPostDto?: AboutMeBoardData;
}

const getSingleAboutMeBoardInfo: QueryFunction<AboutMeBoardInfo, [_1: string, _2: string, _3: string]> = ({
    queryKey,
}) => {
    const boardId = queryKey[2];
    return axios.get(`/api/introduction-post/${boardId}`).then(response => response.data.response);
};

export default getSingleAboutMeBoardInfo;
