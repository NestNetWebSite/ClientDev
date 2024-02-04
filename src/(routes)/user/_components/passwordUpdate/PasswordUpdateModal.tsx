import Modal from 'react-modal';
import PasswordUpdateForm from './PasswordUpdateForm';

interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
}

export default function PasswordUpdateModal({ isModalOpen, closeModal }: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            className={
                'fixed left-1/2 top-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white px-10 py-5'
            }
            closeTimeoutMS={280}
        >
            <h1 className={'mx-2 mb-6 text-xl font-semibold'}>새 비밀번호 설정</h1>
            <PasswordUpdateForm closeModal={closeModal} />
        </Modal>
    );
}
