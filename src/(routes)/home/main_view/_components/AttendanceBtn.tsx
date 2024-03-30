import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FaCalendar } from 'react-icons/fa';
import isServerError from '../../../../_errors/isServerError';

export default function AttendanceBtn() {
    const { mutate: createMyAttd, isPending: isMyAttdPending } = usePostMyAttendance();

    return (
        <div className='absolute bottom-0 right-0 h-[4rem] w-[4rem] overflow-hidden'>
            <button
                className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-full border-2 border-secondary bg-white text-primary transition-all hover:scale-90 hover:text-secondary'
                onClick={() => createMyAttd()}
                disabled={isMyAttdPending}
            >
                <FaCalendar className='hover:primary text-3xl ' />
            </button>
        </div>
    );
}

// REST: 출석 등록
function usePostMyAttendance() {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError>({
        mutationFn: async () => {
            const myAttdURL = `/api/attendance`;
            return await axios.post(myAttdURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            alert('출석 완료!');
            queryClient.invalidateQueries({ queryKey: ['attendance-statistics'] });
        },
        onError: async e => {
            let errorMessage = '';
            if (isServerError(e) && e.response.data && e?.response?.data?.error.message) {
                errorMessage = e.response.data.error.message;
                alert(errorMessage);

                return;
            }
            if (e.response.status === 403) {
                errorMessage = '권한이 없는 사용자입니다';
            } else if (e.response.status === 401) {
                errorMessage = '로그인 후 다시 시도해주세요.';
            } else if (e.response.status === 404) {
                errorMessage = '오늘은 이미 출석하셨습니다! 내일도 방문해주세요!';
            } else if (e.response.status === 500) {
                errorMessage = '출석 등록에 실패하였습니다. 관리자에게 문의해주세요.';
            }
            alert(errorMessage);
        },
        retry: 0,
    });
}
