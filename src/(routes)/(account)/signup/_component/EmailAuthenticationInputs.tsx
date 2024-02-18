import axios from 'axios';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineCheck, MdOutlineCancel, MdOutlineMail, MdOutlineMarkEmailRead } from 'react-icons/md';
import { EMAIL_REGEXP } from '../../../../_constants/accountRegexp/accountRegexps.ts';

interface Props {
    isEmailAuthenticated: boolean;
    checkEmailAuthenticated: () => void;
}

interface FormData {
    emailAddress: string;
    authenticationCode: string;
}

export default function EmailAuthenticationInputs({ isEmailAuthenticated, checkEmailAuthenticated }: Props) {
    const [isAuthenticationRequested, setIsAuthenticationRequested] = useState(false);
    const [isAuthenticationRequesting, setIsAuthenticationRequesting] = useState(false);
    const {
        register,
        getValues,
        getFieldState,
        formState: { errors },
    } = useFormContext<FormData>();

    const handleAuthenticationRequestButtonClick = async () => {
        const emailAddress = getValues().emailAddress.trim();
        if (emailAddress.length === 0 || getFieldState('emailAddress').invalid) {
            return;
        } else {
            if (
                window.confirm(
                    `입력한 이메일 주소는 ${emailAddress} 입니다. 이메일 주소가 정확한지 확인해주세요.\n(확인 버튼을 누르면, 인증 요청 버튼을 누를 수 없습니다.)`,
                )
            ) {
                try {
                    setIsAuthenticationRequesting(true);
                    await axios.post(`/api/auth/mail-auth`, { email: emailAddress });
                    setIsAuthenticationRequested(true);
                    window.alert('인증 메일이 발송되었습니다.');
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
            }
        }
    };

    const handleAuthenticationConfirmButtonClick = async () => {
        const authenticationCode = getValues().authenticationCode.trim();
        if (authenticationCode === '' || getFieldState('authenticationCode').invalid) {
            return;
        } else {
            try {
                await axios.post(`/api/auth/mail-auth-answer`, {
                    answer: authenticationCode,
                });
                window.alert('인증되었습니다.');
                checkEmailAuthenticated();
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
        }
    };

    return (
        <>
            <div className={'w-full'}>
                <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                    <MdOutlineMail className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-xl p-3 focus:outline-none'}
                        type={'email'}
                        placeholder={'이메일'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('emailAddress', {
                            required: { value: true, message: '이메일을 입력해주세요.' },
                            pattern: { value: EMAIL_REGEXP, message: '유요한 이메일 주소를 입력해주세요.' },
                        })}
                        readOnly={isAuthenticationRequested}
                    />
                    <button
                        className={
                            'mr-1 rounded-xl border border-gray-300 p-2 text-rose-700 transition-all hover:bg-gray-50 disabled:opacity-75'
                        }
                        type={'button'}
                        onClick={handleAuthenticationRequestButtonClick}
                        disabled={isAuthenticationRequested || isAuthenticationRequesting}
                    >
                        인증 요청
                    </button>
                </div>
                {errors?.emailAddress?.message && errors?.emailAddress?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.emailAddress.message}</span>
                )}
                {errors?.emailAddress?.message && errors?.emailAddress?.type === 'pattern' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.emailAddress.message}</span>
                )}
            </div>
            <div className={'w-full'}>
                <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                    <MdOutlineMarkEmailRead className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-xl p-3 focus:outline-none disabled:bg-white'}
                        type={'text'}
                        placeholder={'인증코드'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('authenticationCode', {
                            required: { value: true, message: '인증코드를 입력해주세요.' },
                        })}
                        disabled={!isAuthenticationRequested}
                        readOnly={isEmailAuthenticated}
                    />
                    {isEmailAuthenticated ? (
                        <MdOutlineCheck className={'mr-1 h-7 w-7 text-green-400'} />
                    ) : (
                        <MdOutlineCancel className={'mr-1 h-7 w-7 text-red-400'} />
                    )}
                    <button
                        className={
                            'mx-1 rounded-xl border border-gray-300 p-2 text-rose-700 transition-all enabled:hover:bg-gray-50 disabled:opacity-75 '
                        }
                        type={'button'}
                        onClick={handleAuthenticationConfirmButtonClick}
                        disabled={isEmailAuthenticated || !isAuthenticationRequested}
                    >
                        인증 확인
                    </button>
                </div>
                {errors?.authenticationCode?.message && errors?.authenticationCode?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.authenticationCode.message}</span>
                )}
            </div>
        </>
    );
}
