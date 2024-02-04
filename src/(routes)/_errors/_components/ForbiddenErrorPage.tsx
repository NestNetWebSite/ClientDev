import { useNavigate } from 'react-router-dom';

export default function ForbiddenErrorPage() {
    const navigate = useNavigate();

    return (
        <div className={'flex h-[calc(100dvh-4.68rem)] w-full flex-col items-center justify-center gap-y-5'}>
            <span className={'w-full text-center font-bold'}>
                접근이 거부되었습니다. 해당 페이지를 보기 위한 권한이 없습니다.
            </span>
            <button
                className={
                    'rounded-xl border border-rose-700 px-4 py-3 font-bold text-rose-700 transition-all hover:bg-red-50'
                }
                onClick={() => {
                    navigate('/');
                }}
            >
                메인으로
            </button>
        </div>
    );
}
