import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function LogoutStatusArea() {
    return (
        <div className={'flex flex-1 items-center justify-center gap-x-8'}>
            <div className={'flex items-center transition-all hover:text-rose-700'}>
                <FiLogIn className={'mr-1.5 h-5 w-5'} />
                <Link className={'font-semibold'} to={'/signin'}>
                    로그인
                </Link>
            </div>
            <div className={'flex items-center transition-all hover:text-rose-700'}>
                <FiUserPlus className={'mr-1.5 h-5 w-5'} />
                <Link className={'font-semibold'} to={'/signup'}>
                    회원가입
                </Link>
            </div>
        </div>
    );
}
