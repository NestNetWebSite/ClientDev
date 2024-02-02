import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { TbLock, TbLockCheck } from 'react-icons/tb';
import { ID_REGEXP, PASSWORD_REGEXP } from '../../../../_constants/accountRegexp/accountRegexps.ts';

interface FormData {
    loginId: string;
    loginPassword: string;
    confirmPassword: string;
}

export default function AccountInputs() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext<FormData>();

    const handlePasswordVisibilityToggleButtonClick = useCallback(() => {
        setIsPasswordVisible(prevState => !prevState);
    }, []);

    return (
        <>
            <div className={'w-full'}>
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
                            pattern: { value: ID_REGEXP, message: '8~20자의 알파벳, 숫자를 반드시 포함해야 합니다.' },
                        })}
                    />
                </div>
                {errors?.loginId?.message && errors?.loginId?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.loginId.message}</span>
                )}
                {errors?.loginId?.message && errors?.loginId?.type === 'pattern' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.loginId.message}</span>
                )}
            </div>
            <div className={'w-full'}>
                <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                    <TbLock className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-xl p-3 focus:outline-none'}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder={'비밀번호'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('loginPassword', {
                            required: { value: true, message: '비밀번호를 입력해주세요.' },
                            pattern: {
                                value: PASSWORD_REGEXP,
                                message: '8~20자의 알파벳, 숫자, 특수문자를 반드시 포함해야 합니다.',
                            },
                        })}
                    />
                    <button type={'button'} onClick={handlePasswordVisibilityToggleButtonClick}>
                        {isPasswordVisible ? (
                            <FiEye className={'mr-3.5 h-6 w-6 text-gray-500'} />
                        ) : (
                            <FiEyeOff className={'mr-3.5 h-6 w-6 text-gray-500'} />
                        )}
                    </button>
                </div>
                {errors?.loginPassword?.message && errors?.loginPassword?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.loginPassword.message}</span>
                )}
                {errors?.loginPassword?.message && errors?.loginPassword?.type === 'pattern' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.loginPassword.message}</span>
                )}
            </div>
            <div className={'w-full'}>
                <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                    <TbLockCheck className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-xl p-3 focus:outline-none'}
                        type={'password'}
                        placeholder={'비밀번호 확인'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('confirmPassword', {
                            required: { value: true, message: '비밀번호를 입력해주세요.' },
                            validate: {
                                notMatched(value) {
                                    const { loginPassword } = getValues();
                                    return loginPassword === value || '위에서 입력한 비밀번호와 일치하지 않습니다.';
                                },
                            },
                        })}
                    />
                </div>
                {errors?.confirmPassword?.message && errors?.confirmPassword?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.confirmPassword.message}</span>
                )}
                {errors?.confirmPassword?.message && errors?.confirmPassword?.type === 'notMatched' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.confirmPassword.message}</span>
                )}
            </div>
        </>
    );
}
