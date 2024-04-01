import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import useScrollToTop from '../_hooks/useScrollToTop.ts';
import GlobalNavbar from '../_components/globalNavBar/GlobarNavbar.tsx';
import GlobalApiErrorFallback from './_errors/_components/GlobalApiErrorFallback.tsx';

export default function PrivateLayout() {
    useScrollToTop();

    const pathname = useLocation().pathname;
    const { reset } = useQueryErrorResetBoundary();

    const queryClient = useQueryClient();

    const currentUserAuthority: null | undefined | string = queryClient.getQueryData(['loggedIn_user']);

    if (pathname.split('/')[1] === 'admin') {
        if (!currentUserAuthority) {
            window.alert('로그인 후 볼 수 있는 컨텐츠입니다.');
            return <Navigate to={'/signin'} replace />;
        } else if (currentUserAuthority !== 'admin') {
            window.alert('권한이 없습니다.');
            return <Navigate to={'/'} replace />;
        }
    }

    return (
        <div>
            {!(pathname.includes('/admin') && pathname.split('/')[1] === 'admin') && <GlobalNavbar />}
            <ErrorBoundary key={pathname} onReset={reset} FallbackComponent={GlobalApiErrorFallback}>
                <Outlet />
            </ErrorBoundary>
        </div>
    );
}
