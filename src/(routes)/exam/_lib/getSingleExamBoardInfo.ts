import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, ExamBoardData } from '../types.ts';

interface ExamBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    examCollectionPostDto: ExamBoardData;
}

const getSingleExamBoardInfo: QueryFunction<ExamBoardInfo, [_1: string, _2: string, _3: string]> = ({ queryKey }) => {
    const boardId = queryKey[2];
    return axios.get(`/api/exam-collection-post/${boardId}`).then(response => response.data.response);
};

export default getSingleExamBoardInfo;
