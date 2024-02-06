import { NavLink } from 'react-router-dom';

export default function SideNavbar() {
    return (
        <nav className={'flex w-full rounded-t-3xl bg-gray-100'}>
            <NavLink
                to={'/signin'}
                className={({ isActive }) => {
                    return (
                        (isActive ? 'bg-white text-rose-700' : 'bg-gray-100 text-black') +
                        ' w-1/2 rounded-t-2xl py-3 text-center text-lg font-bold transition-all'
                    );
                }}
            >
                로그인
            </NavLink>
            <NavLink
                to={'/signup'}
                className={({ isActive }) => {
                    return (
                        (isActive ? 'bg-white text-rose-700' : 'bg-gray-100 text-black') +
                        ' w-1/2 rounded-t-2xl py-3 text-center text-lg font-bold transition-all'
                    );
                }}
            >
                회원가입
            </NavLink>
        </nav>
    );
}
