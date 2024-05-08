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

    //TODO
    // 로그인한 후 사용자 권한 전역 상태로 저장하기

    return (
        <div>
            {!(pathname.includes('/admin') && pathname.split('/')[1] === 'admin') && <GlobalNavbar />}
            <ErrorBoundary
                key={pathname + new Date().getTime()}
                onReset={reset}
                FallbackComponent={GlobalApiErrorFallback}
            >
                <Outlet />
            </ErrorBoundary>
        </div>
    );
}
