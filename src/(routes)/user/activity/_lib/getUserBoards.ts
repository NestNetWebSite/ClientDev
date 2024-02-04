import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface UserBoard {
    id: number;
    title: string;
    postCategory: string;
    viewCount: number;
    likeCount: number;
}

const getUserBoards: QueryFunction<{ dtoList: UserBoard[] }, [_1: string, _2: string, _3: number]> = ({ queryKey }) => {
    const id = queryKey[2];
    return axios.get(`/api/member-profile/my-post/${id}`).then(response => response.data.response);
};

export default getUserBoards;
