import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FaCalendar } from 'react-icons/fa';

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
        onError: async error => {
            let errorMessage = '';
            if (error.response.status === 403) {
                errorMessage = '권한이 없는 사용자입니다';
                alert(errorMessage);
            } else if (error.response.status === 401) {
                errorMessage = '다시 로그인 해주세요.';
                alert(errorMessage);
            } else if (error.response.status === 500) {
                errorMessage = '출석 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                alert(errorMessage);
            }
        },
        retry: 0,
    });
}
