import LoginStatusArea from './LoginStatusArea';
import LogoutStatusArea from './LogoutStatusArea';

export default function AuthStatusArea() {
    const isLoggedIn = Boolean(localStorage.getItem('isLoggedIn') ?? '');
    return <>{isLoggedIn ? <LoginStatusArea /> : <LogoutStatusArea />}</>;
}
