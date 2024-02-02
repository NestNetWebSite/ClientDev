import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface AboutMeBoard {
    id: number;
    title: string;
    viewCount: number;
    likeCount: number;
    createdTime: number[];
    saveFilePath: string | null;
    saveFileName: string | null;
}

const getAboutMeBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: AboutMeBoard[];
    },
    [_1: string, _2: { currentPage: number }]
> = ({ queryKey }) => {
    const { currentPage } = queryKey[1];
    return axios.get(`/api/introduction-post?page=${currentPage - 1}&size=12`).then(response => response.data.response);
};

export default getAboutMeBoards;
