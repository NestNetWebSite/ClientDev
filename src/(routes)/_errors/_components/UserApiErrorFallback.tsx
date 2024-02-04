import { AxiosError } from 'axios';

export default function UserActivityApiErrorFallback({ error, resetErrorBoundary }) {
    const err = error as AxiosError;
    const errorStatusCode = err.response.status;

    switch (errorStatusCode) {
        case 500:
            return (
                <div className={'flex flex-1 flex-col items-center justify-center'}>
                    <span className={'mb-3 w-full text-center font-bold'}>
                        요청사항을 처리하는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
                    </span>
                    <button
                        onClick={() => {
                            resetErrorBoundary();
                        }}
                        className={
                            'rounded-xl border border-rose-700 bg-rose-700 px-5 py-2 text-white transition-all hover:bg-rose-800'
                        }
                    >
                        다시 시도
                    </button>
                </div>
            );

        default:
            return <></>;
    }
}
