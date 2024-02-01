import { Suspense } from 'react';
import AboutMeBoardModifyForm from './_component/AboutMeBoardModifyForm';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function Page() {
    return (
        <main className={'w-full'}>
            <Suspense fallback={<LoadingSpinner />}>
                <AboutMeBoardModifyForm />
            </Suspense>
        </main>
    );
}
