import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaCalendar } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';

/**
 * 출석 버튼
 * @param {boolean}
 * @returns
 */
export default function AttendanceBtn({ isMemberAttended = false }) {
    const { mutate: createMyAttd, isPending: isMyAttdPending } = usePostMyAttendance();

    return (
        <div className='absolute bottom-0 right-0 h-[4rem] w-[4rem] overflow-hidden'>
            {isMemberAttended ? (
                <div className='flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-secondary bg-white'>
                    <FaCalendarCheck className='text-3xl text-secondary' />
                </div>
            ) : (
                <div
                    className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-full border-2 border-gray-400 bg-white'
                    onClick={() => createMyAttd()}
                    disabled={isMemberAttended || isMyAttdPending}
                >
                    <FaCalendar className='text-3xl text-gray-300' />
                </div>
            )}
        </div>
    );
}

// REST: 출석 등록
function usePostMyAttendance() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const myAttdURL = `${import.meta.env.VITE_APP_SERVER}/attendance`;
            return await axios.post(myAttdURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            window.alert('출석 완료!');
            queryClient.invalidateQueries(['attendance-statistics']);
        },
        throwOnError: true,
    });
}
