import { useQueryClient } from '@tanstack/react-query';
import LoginStatusArea from './LoginStatusArea';
import LogoutStatusArea from './LogoutStatusArea';

export default function AuthStatusArea() {
    // const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn') ?? '');
    const isLoggedIn = !!useQueryClient().getQueryData(['loggedIn_user']);
    return <>{isLoggedIn ? <LoginStatusArea /> : <LogoutStatusArea />}</>;
}
