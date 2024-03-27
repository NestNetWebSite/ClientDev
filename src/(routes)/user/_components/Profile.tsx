import { Link } from 'react-router-dom';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { FaSchool } from 'react-icons/fa';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import Avatar from './Avatar.tsx';

const memberAuthorityInfo: { value: string; label: string }[] = [
    { value: 'ADMIN', label: '관리자' },
    { value: 'GENERAL_MEMBER', label: '재학생' },
    { value: 'MANAGER', label: '관리자' },
    { value: 'GRADUATED_MEMBER', label: '졸업생' },
    { value: 'PRESIDENT', label: '회장' },
    { value: 'VICE_PRESIDENT', label: '부회장' },
    { value: 'WITHDRAWN_MEMBER', label: '탈퇴자' },
    { value: 'ON_LEAVE_MEMBER', label: '휴학생' },
];

interface Props {
    name: string;
    emailAddress: string;
    memberAuthority: string;
    grade: number;
    graduateYear: number | null;
    studentId: string;
}

export default function Profile({ name, memberAuthority, emailAddress, grade, graduateYear }: Props) {
    return (
        <div className={'flex h-fit w-[15.5rem] flex-col rounded-xl'}>
            <div className={'mx-auto'}>
                <Avatar name={name} memberAuthority={memberAuthority} />
            </div>
            <h3 className={'mx-1.5 mb-6 mt-7 w-full text-left text-base font-bold'}>개인 정보</h3>
            <div className={'mb-7 flex flex-col gap-y-7'}>
                <div className={'flex items-center gap-x-2.5 text-gray-600'}>
                    <FiUser className={'h-5 w-5'} />
                    <span className={'text-[0.95rem] font-semibold'}>{name}</span>
                </div>
                <div className={'flex items-center gap-x-2.5 text-gray-600'}>
                    <MdOutlineEmail className={'h-5 w-5'} />
                    <div className={'flex-1 items-center overflow-x-scroll scrollbar-hide'}>
                        <span className={'text-[0.95rem] font-semibold'}>{emailAddress}</span>
                    </div>
                </div>
                <div className={'flex items-center gap-x-2.5 text-blue-500'}>
                    <FaSchool className={'h-5 w-5'} />
                    <span className={'text-[0.95rem] font-semibold'}>{grade}학년</span>
                </div>
                <div className={'flex items-center justify-between text-orange-500'}>
                    <div className={'flex gap-x-2.5'}>
                        <BsFillCreditCardFill className={'h-5 w-5'} />
                        <span className={'text-[0.95rem] font-semibold'}>
                            {memberAuthorityInfo.find(element => element.value === memberAuthority).label}
                        </span>
                    </div>
                    {(memberAuthority === 'ADMIN' || memberAuthority === 'MANAGER') && (
                        <Link
                            className={
                                'mr-4 text-sm font-bold text-secondary transition-all hover:decoration-secondary hover:decoration-2 hover:underline-offset-4'
                            }
                            to={'/admin'}
                            target={'_blank'}
                        >
                            관리자 페이지
                        </Link>
                    )}
                </div>
                {memberAuthority === 'GRADUATED' && (
                    <div className={'flex items-center gap-x-2.5 text-gray-500'}>
                        <FiCalendar className={'h-5 w-5'} />
                        <span className={'text-[0.95rem] font-semibold'}>{graduateYear}년</span>
                    </div>
                )}
            </div>
        </div>
    );
}
