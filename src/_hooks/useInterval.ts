import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, delay: number): void {
    const savedCallback = useRef<(() => void) | null>(null);

    // 콜백함수 등록
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const executeCallback = () => {
            savedCallback.current && savedCallback.current();
        };

        const timerId = setInterval(executeCallback, delay);

        return () => clearInterval(timerId);
    }, [delay]);
}
