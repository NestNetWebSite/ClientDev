// PAGE: 관리자 페이지
import NavigationBar from './_components/NavigationBar';
import { Outlet } from 'react-router-dom';

export default function Page() {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
}
