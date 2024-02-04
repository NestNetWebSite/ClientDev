import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, UnifiedBoardData } from '../types.ts';

interface UnifiedBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    unifiedPostDto: UnifiedBoardData;
}

const getSingleUnifiedBoardInfo: QueryFunction<UnifiedBoardInfo, [_1: string, _2: string, _3: string]> = ({
    queryKey,
}) => {
    const boardId = queryKey[1];
    return axios.get(`/api/unified-post/${boardId}`).then(response => response.data.response);
};

export default getSingleUnifiedBoardInfo;
