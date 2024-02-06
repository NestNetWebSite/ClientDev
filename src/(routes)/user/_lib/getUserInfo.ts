import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface UserInfo {
    id: number;
    loginId: string;
    name: string;
    emailAddress: string;
    studentId: string;
    memberAuthority: string;
    grade: number;
    graduateYear: number | null;
    loginMember: boolean;
}

const userInfo: UserInfo = {
    id: 1,
    loginId: 'aaaa1234',
    name: '김강민',
    emailAddress: 'kangmin9814@gmail.com',
    studentId: '2020039048',
    memberAuthority: 'ADMIN',
    grade: 4,
    graduateYear: null,
    loginMember: true,
};

const getUserInfo: QueryFunction<UserInfo, [_1: string, _2: string]> = ({ queryKey }) => {
    const userId = queryKey[1];
    if (userId === '') {
        return axios.get(`/api/member-profile/member-info`).then(response => response.data.response);
    }
    return axios.get(`/api/member-profile/member-info/${userId}`).then(response => response.data.response);
};

export default getUserInfo;
