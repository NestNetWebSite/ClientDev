import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface NoticeBoard {
    id: number;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;
    userName: string;
}

const getNoticeBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: NoticeBoard[];
    },
    [_1: string, _2: { currentPage: number }]
> = ({ queryKey }) => {
    const { currentPage } = queryKey[1];
    return axios.get(`/api/notice-post?page=${currentPage - 1}&size=12`).then(response => response.data.response);
};

export default getNoticeBoards;
