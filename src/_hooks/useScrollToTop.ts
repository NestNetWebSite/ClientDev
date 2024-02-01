import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function useScrollToTop(): void {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
    }, [location.pathname, searchParams]);
}
