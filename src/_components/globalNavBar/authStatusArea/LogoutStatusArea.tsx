import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function LogoutStatusArea() {
    return (
        <div className={'flex flex-row items-center justify-evenly gap-2'}>
            <Link to={'/signin'} className={'font-semibold'}>
                <div className={'flex min-w-max flex-row items-center text-slate-500 duration-300 hover:text-primary'}>
                    <FiLogIn className={'inline h-6 w-6 md:mr-2'} />
                    <span className='hidden md:inline'>로그인</span>
                </div>
            </Link>
            <div
                className={
                    'flex min-w-max cursor-pointer flex-row items-center text-slate-500 duration-300 hover:text-primary'
                }
            >
                <Link className={'font-semibold'} to={'/signup'}>
                    <FiUserPlus className={'inline h-6 w-6 md:mr-2'} />
                    <span className={'hidden font-semibold md:inline'}>회원가입</span>
                </Link>
            </div>
        </div>
    );
}
