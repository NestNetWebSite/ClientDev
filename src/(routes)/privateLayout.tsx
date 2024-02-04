import { Outlet, useLocation } from 'react-router-dom';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import useScrollToTop from '../_hooks/useScrollToTop.ts';
import GlobalNavbar from '../_components/globalNavBar/GlobarNavbar.tsx';
import GlobalApiErrorFallback from './_errors/_components/GlobalApiErrorFallback.tsx';

export default function PrivateLayout() {
    useScrollToTop();

    const pathname = useLocation().pathname;
    const { reset } = useQueryErrorResetBoundary();

    return (
        <div>
            <GlobalNavbar />
            <ErrorBoundary key={pathname} onReset={reset} FallbackComponent={GlobalApiErrorFallback}>
                <Outlet />
            </ErrorBoundary>
        </div>
    );
}
