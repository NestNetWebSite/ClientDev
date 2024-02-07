import { Suspense } from 'react';
import UnifiedBoardModifyForm from './_component/UnifiedBoardModifyForm';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner size={70} />}>
            <main className={'w-full'}>
                <UnifiedBoardModifyForm />
            </main>
        </Suspense>
    );
}
