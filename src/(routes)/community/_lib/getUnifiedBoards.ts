import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface UnifiedBoard {
    id: string | number;
    username: string;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;
}

const getUnifiedBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: UnifiedBoard[];
    },
    [_1: string, _2: string, _3: { currentCategory: string; currentPage: number }]
> = ({ queryKey }) => {
    const { currentCategory, currentPage } = queryKey[2];
    return axios
        .get(`/api/unified-post?post-type=${currentCategory.toUpperCase()}&page=${currentPage - 1}&size=12`)
        .then(response => response.data.response);
};

export default getUnifiedBoards;
