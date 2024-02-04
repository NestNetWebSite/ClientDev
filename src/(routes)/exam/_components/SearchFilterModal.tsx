import Modal from 'react-modal';
import SearchFilterForm from './SearchFilterForm';

interface ExamSearchFilter {
    year: string;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
    updateCurrentSearchFilter: (newSearchFilter: ExamSearchFilter) => void;
}

export default function SearchFilterModal({ isModalOpen, closeModal, updateCurrentSearchFilter }: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            closeTimeoutMS={280}
            className={
                'fixed left-1/2 top-1/2 w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-300 bg-white px-10 py-5'
            }
        >
            <h1 className={'mx-2 mb-6 text-xl font-semibold'}>검색 필터 설정</h1>
            <SearchFilterForm updateCurrentSearchFilter={updateCurrentSearchFilter} closeModal={closeModal} />
        </Modal>
    );
}
