import { Outlet, useLocation } from 'react-router-dom';
import useScrollToTop from '../_hooks/useScrollToTop.ts';

export default function PublicLayout() {
    useScrollToTop();

    const pathname = useLocation().pathname;

    return (
        <>
            {pathname !== '/signin' &&
                pathname !== '/signup' &&
                pathname !== '/search_id' &&
                pathname !== '/search_pw' && <></>}
            <Outlet />
        </>
    );
}
