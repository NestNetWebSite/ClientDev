import { NavLink } from 'react-router-dom';

export default function SideNavbar() {
    return (
        <nav className={'flex w-full rounded-t-2xl bg-gray-100'}>
            <NavLink
                to={'/search_id'}
                className={({ isActive }) => {
                    return (
                        (isActive ? 'bg-white text-secondary' : 'bg-gray-100 text-black') +
                        ' w-1/2 rounded-t-2xl py-3 text-center text-lg font-bold transition-all'
                    );
                }}
            >
                아이디 찾기
            </NavLink>
            <NavLink
                to={'/search_pw'}
                className={({ isActive }) => {
                    return (
                        (isActive ? 'bg-white text-secondary' : 'bg-gray-100 text-black') +
                        ' w-1/2 rounded-t-2xl py-3 text-center text-lg font-bold transition-all'
                    );
                }}
            >
                비밀번호 찾기
            </NavLink>
        </nav>
    );
}
