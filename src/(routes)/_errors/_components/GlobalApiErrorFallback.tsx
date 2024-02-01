import { AxiosError } from 'axios';
import UnauthorizedErrorPage from './UnauthorizedErrorPage';
import ForbiddenErrorPage from './ForbiddenErrorPage';
import NotFoundErrorPage from './NotFoundErrorPage';
import ServerErrorPage from './ServerErrorPage';

// @ts-ignore
export default function GlobalApiErrorFallback({ error, resetErrorBoundary }) {
    const err = error as AxiosError;
    // const errorStatusCode: number = 403;
    const errorStatusCode = err?.response?.status;

    switch (errorStatusCode) {
        case 401:
            return <UnauthorizedErrorPage />;

        case 403:
            return <ForbiddenErrorPage />;

        case 404:
            return <NotFoundErrorPage />;

        case 500:
            return <ServerErrorPage resetErrorBoundary={resetErrorBoundary} />;

        default:
            return null;
    }
}
