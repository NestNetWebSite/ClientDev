import { useNavigate } from 'react-router-dom';

export default function UnauthorizedErrorPage() {
    const navigate = useNavigate();

    return (
        <div className={'flex h-[calc(100dvh-4.68rem)] w-full flex-col items-center justify-center gap-y-5'}>
            <span className={'w-full text-center font-bold'}>
                로그인 후 볼 수 있는 컨텐츠입니다. 로그인 후 다시 시도해 주세요.
            </span>
            <div className={'flex gap-x-5'}>
                <button
                    className={
                        'rounded-xl border border-rose-800 px-4 py-3 font-bold text-rose-800 transition-all hover:bg-red-50'
                    }
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    메인으로
                </button>
                <button
                    className={
                        'rounded-xl border border-rose-800 bg-rose-800 px-4 py-3 font-bold text-white transition-all hover:bg-rose-900'
                    }
                    onClick={() => {
                        navigate('/signin');
                    }}
                >
                    로그인
                </button>
            </div>
        </div>
    );
}
