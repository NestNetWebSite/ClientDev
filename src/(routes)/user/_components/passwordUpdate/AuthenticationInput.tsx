import axios from 'axios';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
    isAuthenticated: boolean;
    checkAuthentication: () => void;
}

interface FormData {
    currentPassword: string;
}

export default function AuthenticationInput({ isAuthenticated, checkAuthentication }: Props) {
    const {
        register,
        getValues,
        getFieldState,
        formState: { errors },
    } = useFormContext<FormData>();

    const handleButtonClick = useCallback(() => {
        const currentPassword = getValues().currentPassword;
        if (currentPassword === '' || getFieldState('currentPassword').invalid) {
            return;
        }
        axios
            .post(`/api/member/check-pw`, { password: currentPassword })
            .then(() => {
                window.alert('사용자 인증에 성공하였습니다.');
                checkAuthentication();
            })
            .catch(() => {
                window.alert('사용자 인증에 실패하였습니다.');
            });
    }, []);

    return (
        <div className={`w-full ${isAuthenticated ? 'opacity-75' : 'opacity-100'}`}>
            <div className={'mb-6 flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'currentPasswordInput'}>
                    사용자 인증
                </label>
                <div className={'flex gap-x-3'}>
                    <input
                        className={'flex-1 rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                        type={'password'}
                        placeholder={'현재 비밀번호'}
                        disabled={isAuthenticated}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('currentPassword', {
                            required: { value: true, message: '비밀번호를 입력해주세요.' },
                        })}
                    />
                    <button
                        className={
                            'flex cursor-pointer items-center justify-center rounded-xl border border-rose-700 px-5 py-1 font-bold text-rose-700 shadow transition-all hover:bg-gray-50'
                        }
                        type={'button'}
                        onClick={handleButtonClick}
                    >
                        인증
                    </button>
                </div>
                {errors?.currentPassword?.message && errors.currentPassword?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.currentPassword.message}</span>
                )}
            </div>
        </div>
    );
}
