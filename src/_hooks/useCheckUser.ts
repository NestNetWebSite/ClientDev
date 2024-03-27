import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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

export default function useCheckUser() {
    useQuery<UserInfo | null>({
        queryKey: ['loggedIn_user'],
        queryFn: () => {
            return axios
                .get('/api/member-profile/member-info')
                .then(response => response.data.response)
                .catch(() => null);
        },
    });
}
