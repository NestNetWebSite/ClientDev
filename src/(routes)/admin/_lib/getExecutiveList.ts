import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface Executive {
    id: number;
    year: number;
    name: string;
    studentId: string;
    role: string;
    priority: number;
}

const getExecutiveList: QueryFunction<{ dtoList: Executive[] }, [_1: string, _2: string]> = ({ queryKey }) => {
    return axios
        .get(`/api/executive-info/${queryKey[1] === 'current' ? 'current' : 'prev'}`)
        .then(response => response.data.response);
    // return Promise.resolve({ dtoList: currentExecutiveList });
};

export default getExecutiveList;
