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

const currentExecutiveList: Executive[] = [
    {
        id: 1,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '회장',
        priority: 1,
    },
    {
        id: 2,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '부회장',
        priority: 2,
    },
    {
        id: 3,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '총무',
        priority: 3,
    },
    {
        id: 4,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '서버',
        priority: 4,
    },
    {
        id: 5,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '기획',
        priority: 5,
    },
    {
        id: 6,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '홍보',
        priority: 6,
    },
    {
        id: 7,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '학술',
        priority: 7,
    },
    {
        id: 8,
        year: 2024,
        name: '김강민',
        studentId: '2020039048',
        role: '복지',
        priority: 8,
    },
];

const getExecutiveList: QueryFunction<{ dtoList: Executive[] }, [_1: string, _2: string]> = ({ queryKey }) => {
    // return axios.get(`/api/executive-info/${queryKey[1] === 'current' ? 'current' : 'prev'}`)
    return Promise.resolve({ dtoList: currentExecutiveList });
};

export default getExecutiveList;
