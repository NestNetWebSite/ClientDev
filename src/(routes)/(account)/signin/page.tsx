import axios from 'axios';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi';

interface FormData {
    loginId: string;
    password: string;
}

export default function Page() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ mode: 'onBlur' });

    const navigate = useNavigate();

    const handlePasswordVisibilityToggleButtonClick = useCallback(() => {
        setIsPasswordVisible(prevState => !prevState);
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            await axios.post(`/api/auth/login`, data);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        } catch (error) {
            // @ts-ignore
            let errorMessage = '';
            if (error.response.status === 403) {
                errorMessage = error.response.data;
            } else {
                errorMessage = error.response.data.error.message;
            }
            window.alert(errorMessage);
        }
    };

    return (
        <main className={'w-full'}>
            <form className={'flex w-full flex-col items-center p-8'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'mb-10 flex w-full flex-col gap-y-8'}>
                    <div>
                        <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                            <FiUser className={'ml-1 h-7 w-7'} />
                            <input
                                className={'flex-1 rounded-xl p-3 focus:outline-none'}
                                type={'text'}
                                placeholder={'아이디'}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                {...register('loginId', {
                                    required: { value: true, message: '아이디를 입력해주세요.' },
                                })}
                            />
                        </div>
                        {errors?.loginId?.message && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.loginId.message}</span>
                        )}
                    </div>
                    <div>
                        <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                            <FiLock className={'ml-1 h-7 w-7'} />
                            <input
                                className={'flex-1 rounded-xl p-3 focus:outline-none'}
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder={'비밀번호'}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                {...register('password', {
                                    required: { value: true, message: '비밀번호를 입력해주세요.' },
                                })}
                            />
                            <button type={'button'} onMouseDown={handlePasswordVisibilityToggleButtonClick}>
                                {isPasswordVisible ? (
                                    <FiEye className={'mr-3.5 h-6 w-6 text-gray-500'} />
                                ) : (
                                    <FiEyeOff className={'mr-3.5 h-6 w-6 text-gray-500'} />
                                )}
                            </button>
                        </div>
                        {errors?.password?.message && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.password.message}</span>
                        )}
                    </div>
                </div>
                <div className={'mb-6 w-full'}>
                    <button
                        className={
                            'w-full rounded-xl bg-rose-700 py-3 text-lg font-bold text-white transition-all hover:bg-rose-800 enabled:opacity-100 disabled:opacity-75'
                        }
                        type={'submit'}
                        disabled={isSubmitting}
                    >
                        로그인
                    </button>
                </div>
                <div className={'w-full text-end'}>
                    <Link
                        className={'text-[0.9rem] font-bold text-gray-500 transition-all hover:text-rose-700'}
                        to={'/search_id'}
                    >
                        아이디 / 비밀번호 찾기
                    </Link>
                </div>
            </form>
        </main>
    );
}
