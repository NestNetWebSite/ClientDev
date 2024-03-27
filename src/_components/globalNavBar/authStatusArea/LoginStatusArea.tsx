import axios from 'axios';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut, BiUserPin } from 'react-icons/bi';

export default function LoginStatusArea() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleLogoutTextClick = useCallback(() => {
        axios
            .get(`/api/auth/logout`)
            .then(response => {
                window.alert(response.data.response);
                queryClient
                    .invalidateQueries({
                        queryKey: ['loggedIn_user'],
                    })
                    .then(() => {
                        navigate('/');
                    });
            })
            .catch(error => {
                let errorMessage = '';
                if (error.response.status === 403) {
                    errorMessage = error.response.data;
                } else {
                    errorMessage = error.response.data.error.message;
                }
                window.alert(errorMessage);
            });
    }, []);

    return (
        <div className={'flex flex-row items-center justify-evenly gap-2'}>
            <Link to={'/user'} className={'font-semibold'}>
                <div className={'flex min-w-max flex-row items-center text-slate-500 duration-300 hover:text-primary'}>
                    <BiUserPin className={'inline h-6 w-6 md:mr-2'} />
                    <span className='hidden md:inline'>마이페이지</span>
                </div>
            </Link>
            <div
                className={
                    'flex min-w-max cursor-pointer flex-row items-center text-slate-500 duration-300 hover:text-primary'
                }
            >
                <BiLogOut className={'inline h-6 w-6 md:mr-2'} />
                <span
                    className={'hidden font-semibold md:inline'}
                    onClick={(): void => {
                        handleLogoutTextClick();
                    }}
                >
                    로그아웃
                </span>
            </div>
        </div>
    );
}
