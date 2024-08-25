import { useQuery } from '@tanstack/react-query';
import { IAttdRanks, INewPost } from '../(routes)/home/type';
import axios from 'axios';

// REST: 최근글 조회
export const useGetNewPosts = () => {
    return useQuery<INewPost[]>({
        queryKey: ['recent-posts'],
        queryFn: async () => {
            const recentPostsURL = `/api/post/recent-posts`;
            return await axios.get(recentPostsURL).then(res => {
                return res.data.response.dtoList;
            });
        },
        retry: 0,
    });
};

// REST: 출석 순위 조회
export const useGetAttendance = () => {
    return useQuery<IAttdRanks>({
        queryKey: ['attendance-statistics'],
        queryFn: async () => {
            const attendanceURL = `/api/attendance/statistics`;

            return await axios.get(attendanceURL).then(res => {
                return res.data.response;
            });
        },
        retry: 0,
    });
};
