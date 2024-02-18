import axios from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AuthenticationInput from './AuthenticationInput';
import { PASSWORD_REGEXP } from '../../../../_constants/accountRegexp/accountRegexps.ts';

interface FormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function PasswordUpdateForm({ closeModal }: { closeModal(): void }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const methods = useForm<FormData>({ mode: 'onBlur' });
    const onSubmit: SubmitHandler<FormData> = data => {
        axios
            .post(
                `/api/member/change-pw`,
                { password: data.newPassword },
                {
                    withCredentials: true,
                    headers: { Authorization: localStorage.getItem('access_token') },
                },
            )
            .then(() => {
                window.alert('비밀번호를 변경하였습니다.');
            })
            .catch(error => {
                let errorMessage = '';
                if (error.response.status === 403) {
                    errorMessage = error.response.data;
                } else {
                    errorMessage = error.response.data.error.message;
                }
                window.alert(errorMessage);
            })
            .finally(() => {
                closeModal();
            });
    };

    return (
        <FormProvider {...methods}>
            <form className={'w-full'} onSubmit={methods.handleSubmit(onSubmit)}>
                <AuthenticationInput
                    isAuthenticated={isAuthenticated}
                    checkAuthentication={(): void => {
                        setIsAuthenticated(true);
                    }}
                />
                <hr />
                <div className={`${isAuthenticated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={'my-6 flex w-full flex-col'}>
                        <input
                            className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                            id={'newPasswordInput'}
                            type={'password'}
                            placeholder={'새 비밀번호'}
                            disabled={!isAuthenticated}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...methods.register('newPassword', {
                                required: { value: true, message: '새 비밀번호를 입력해주세요.' },
                                pattern: {
                                    value: PASSWORD_REGEXP,
                                    message: '8~20자의 알파벳, 숫자, 특수문자를 반드시 포함해야 합니다.',
                                },
                            })}
                        />
                        {methods.formState.errors?.newPassword?.message &&
                            methods.formState.errors?.newPassword?.type === 'required' && (
                                <span className={'m-1 text-sm text-red-500'}>
                                    ※ {methods.formState.errors.newPassword.message}
                                </span>
                            )}
                        {methods.formState.errors?.newPassword?.message &&
                            methods.formState.errors?.newPassword?.type === 'pattern' && (
                                <span className={'m-1 text-sm text-red-500'}>
                                    ※ {methods.formState.errors.newPassword.message}
                                </span>
                            )}
                    </div>
                    <div className={'mb-6 flex w-full flex-col'}>
                        <input
                            className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                            id={'confirmPasswordInput'}
                            type={'password'}
                            placeholder={'비밀번호 확인'}
                            disabled={!isAuthenticated}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...methods.register('confirmPassword', {
                                required: { value: true, message: '비밀번호를 입력해주세요.' },
                                validate: {
                                    notMatched() {
                                        const { newPassword, confirmPassword } = methods.getValues();
                                        return (
                                            newPassword === confirmPassword ||
                                            '위에서 입력한 비밀번호와 일치하지 않습니다.'
                                        );
                                    },
                                },
                            })}
                        />
                        {methods.formState.errors?.confirmPassword?.message &&
                            methods.formState.errors?.confirmPassword?.type === 'required' && (
                                <span className={'m-1 text-sm text-red-500'}>
                                    ※ {methods.formState.errors.confirmPassword.message}
                                </span>
                            )}
                        {methods.formState.errors?.confirmPassword?.message &&
                            methods.formState.errors?.confirmPassword?.type === 'notMatched' && (
                                <span className={'m-1 text-sm text-red-500'}>
                                    ※ {methods.formState.errors.confirmPassword.message}
                                </span>
                            )}
                    </div>
                </div>
                <div className={'flex w-full items-center justify-end gap-x-3'}>
                    <button
                        className={
                            'rounded-lg border border-rose-700 bg-white px-5 py-2 font-semibold text-rose-700 transition-all hover:bg-rose-50 '
                        }
                        type={'button'}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        취소
                    </button>
                    <button
                        className={
                            'rounded-lg bg-rose-700 px-5 py-2 font-semibold text-white transition-all enabled:hover:bg-rose-900 disabled:opacity-50 '
                        }
                        type={'submit'}
                        disabled={!isAuthenticated}
                    >
                        변경
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
