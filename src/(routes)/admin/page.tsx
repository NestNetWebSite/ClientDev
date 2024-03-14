import NavigationBar from './_components/NavigationBar';
import { Outlet } from 'react-router-dom';

// 관리자 페이지
export default function Page() {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
}
