// COMPONENT: 출석체크 버튼
import { FaCalendar } from 'react-icons/fa';
import { usePostMyAttendance } from '../../../../api/home-api';

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
