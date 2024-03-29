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

// const formerExecutiveList: Executive[] = [
//     {
//         id: 1,
//         year: 2023,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '회장',
//     },
//     {
//         id: 2,
//         year: 2023,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '부회장',
//     },
//     {
//         id: 3,
//         year: 2023,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '총무',
//     },
//     {
//         id: 4,
//         year: 2022,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '서버',
//     },
//     {
//         id: 5,
//         year: 2022,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '기획',
//     },
//     {
//         id: 6,
//         year: 2022,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '홍보',
//     },
//     {
//         id: 7,
//         year: 2021,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '학술',
//     },
//     {
//         id: 8,
//         year: 2021,
//         name: '김강민',
//         studentId: '2020039048',
//         role: '복지',
//     },
// ];

const getFormerExecutives: QueryFunction<{ dtoList: Executive[] }, [_1: string, _2: string]> = () => {
    return axios.get('/api/executive-info/prev').then(response => response.data.response);
    // return Promise.resolve({ dtoList: formerExecutiveList });
};

export default getFormerExecutives;
