import { useCallback, useState } from 'react';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';
import { TiSpanner } from 'react-icons/ti';
import ProfileUpdateModal from './profileUpdate/ProfileUpdateModal.tsx';
import PasswordUpdateModal from './passwordUpdate/PasswordUpdateModal.tsx';
import WithdrawModal from './withdraw/WithdrawModal.tsx';

interface Props {
    name: string;
    emailAddress: string;
    studentId: string;
    loginId: string;
    grade: number;
}

export default function AccountManagement({ name, emailAddress, studentId, loginId, grade }: Props) {
    const [isProfileUpdateModalOpen, setIsProfileUpdateModalOpen] = useState(false);

    const [isPasswordUpdateModalOpen, setIsPasswordUpdateModalOpen] = useState(false);

    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const closeModal = useCallback((target: string) => {
        switch (target) {
            case 'profileUpdateModal':
                setIsProfileUpdateModalOpen(false);
                break;

            case 'passwordUpdateModal':
                setIsPasswordUpdateModalOpen(false);
                break;

            case 'withdrawModal':
                setIsWithdrawModalOpen(false);
                break;
        }
    }, []);

    return (
        <>
            <div className={'flex flex-col gap-y-7 border-gray-200'}>
                <div className={'flex items-center gap-x-2.5 text-gray-500 transition-all hover:text-green-400'}>
                    <TiSpanner className={'h-5 w-5'} />
                    <span
                        onClick={() => {
                            setIsProfileUpdateModalOpen(true);
                        }}
                        className={'cursor-pointer text-[0.95rem] font-semibold'}
                    >
                        개인 정보 수정
                    </span>
                </div>
                <div className={'flex items-center gap-x-2.5 text-gray-500 transition-all hover:text-blue-400'}>
                    <MdOutlineManageAccounts className={'h-5 w-5'} />
                    <span
                        onClick={() => {
                            setIsPasswordUpdateModalOpen(true);
                        }}
                        className={'cursor-pointer text-[0.95rem] font-semibold'}
                    >
                        비밀번호 변경
                    </span>
                </div>
                <div className={'mb-7 flex items-center gap-x-2.5 text-gray-500 transition-all hover:text-red-400'}>
                    <PiSignOut className={'h-6 w-6'} />
                    <span
                        onClick={() => {
                            setIsWithdrawModalOpen(true);
                        }}
                        className={'cursor-pointer text-[0.95rem] font-semibold'}
                    >
                        계정 탈퇴
                    </span>
                </div>
            </div>
            <ProfileUpdateModal
                isModalOpen={isProfileUpdateModalOpen}
                closeModal={() => {
                    closeModal('profileUpdateModal');
                }}
                name={name}
                emailAddress={emailAddress}
                studentId={studentId}
                loginId={loginId}
                grade={grade}
            />
            <PasswordUpdateModal
                isModalOpen={isPasswordUpdateModalOpen}
                closeModal={() => {
                    closeModal('passwordUpdateModal');
                }}
            />
            <WithdrawModal
                isModalOpen={isWithdrawModalOpen}
                closeModal={() => {
                    closeModal('withdrawModal');
                }}
            />
        </>
    );
}
