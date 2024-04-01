import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FaCalendar } from 'react-icons/fa';
import isServerError from '../../../../_errors/isServerError';

export default function AttendanceBtn() {
    const { mutate: createMyAttd, isPending: isMyAttdPending } = usePostMyAttendance();

    return (
        <button
            className={`relative h-[4rem] w-[4rem] cursor-pointer  
                overflow-hidden rounded-full border-2 border-primary bg-white text-center text-primary 
                outline-none transition-all before:absolute before:left-0
                before:top-[100%] before:-z-20 before:h-full before:w-full before:bg-primary before:transition-all 
                before:duration-300 hover:scale-90 hover:bg-transparent 
              hover:text-white before:hover:-translate-y-[100%]`}
            onClick={() => createMyAttd()}
            disabled={isMyAttdPending}
        >
            <div className='absolute left-[50%] top-[50%] z-10 -translate-x-[50%] -translate-y-[50%]'>
                <FaCalendar className='text-2xl' />
            </div>
        </button>
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
