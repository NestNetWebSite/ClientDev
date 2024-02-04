import Modal from 'react-modal';
import ProfileUpdateForm from './ProfileUpdateForm';

interface Props {
    isModalOpen: boolean;

    closeModal(): void;

    name: string;
    emailAddress: string;
    studentId: string;
    loginId: string;
    grade: number;
}

export default function ProfileUpdateModal({
    isModalOpen,
    closeModal,
    name,
    emailAddress,
    studentId,
    loginId,
    grade,
}: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            className={
                'fixed left-1/2 top-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-300 bg-white px-10 py-5'
            }
            closeTimeoutMS={280}
        >
            <h1 className={'mx-2 mb-6 text-xl font-semibold'}>개인 정보 수정</h1>
            <ProfileUpdateForm
                loginId={loginId}
                name={name}
                emailAddress={emailAddress}
                studentId={studentId}
                grade={grade}
                closeModal={closeModal}
            />
        </Modal>
    );
}
