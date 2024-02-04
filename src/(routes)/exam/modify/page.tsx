import { Suspense } from 'react';
import ExamBoardModifyForm from './_component/ExamBoardModifyForm.tsx';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <main className={'w-full'}>
                <ExamBoardModifyForm />
            </main>
        </Suspense>
    );
}
