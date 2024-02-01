import { Suspense } from 'react';
import NoticeBoardModifyForm from './_component/NoticeBoardModifyForm';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function Page() {
    return (
        <main className={'w-full'}>
            <Suspense fallback={<LoadingSpinner />}>
                <NoticeBoardModifyForm />
            </Suspense>
        </main>
    );
}
