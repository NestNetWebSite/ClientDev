import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
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

    return useMutation<AxiosResponse>({
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
            // @ts-ignore
            // 타입 지정 필요
            alert(error?.response.data.error.message);
        },
        retry: 0,
    });
}
