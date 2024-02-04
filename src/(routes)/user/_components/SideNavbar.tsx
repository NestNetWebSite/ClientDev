import { Link, useParams } from 'react-router-dom';

export default function SideNavbar() {
    const userId = useParams().userId;

    return (
        <nav className={'h-16 w-full rounded-t-xl border-b border-gray-200 px-8 pt-6'}>
            <h1 className={'hidden'}>UserPage SideNav</h1>
            <ul className={'flex h-full items-center gap-x-10'}>
                <li className={'relative h-full'}>
                    <Link className={'font-bold'} to={userId ? `/user/${userId}/activity` : '/user/activity'}>
                        활동 관리
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
