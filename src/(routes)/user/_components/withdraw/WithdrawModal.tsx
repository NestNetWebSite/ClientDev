import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
}

export default function WithdrawModal({ isModalOpen, closeModal }: Props) {
    const navigate = useNavigate();

    const {
        register,
        resetField,
        getValues,
        getFieldState,
        formState: { errors },
    } = useForm<{ currentPassword: string }>({ mode: 'onBlur' });

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthenticationButtonClick = useCallback(() => {
        const currentPassword = getValues().currentPassword;
        if (currentPassword === '' || getFieldState('currentPassword').invalid) {
            return;
        }
        axios
            .post(`/api/member/check-pw`, { password: currentPassword })
            .then(() => {
                window.alert('사용자 인증에 성공하였습니다.');
                setIsAuthenticated(true);
            })
            .catch(() => {
                window.alert('사용자 인증에 실패하였습니다.');
            });
    }, []);

    const handleWithdrawButtonClick = useCallback(async () => {
        if (window.confirm('정말로 탈퇴하시겠습니까?')) {
            try {
                await axios.get('/api/member/withdraw');
                localStorage.removeItem('isLoggedIn');
                window.alert('탈퇴처리 되었습니다.');
                navigate('/', { replace: true });
            } catch (error) {
                window.alert('계정 탈퇴에 실패하였습니다.');
            }
        }
    }, []);

    return (
        <Modal
            isOpen={isModalOpen}
            className={
                'fixed left-1/2 top-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-gray-300 bg-white px-10 py-5'
            }
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            closeTimeoutMS={280}
            onAfterClose={() => {
                resetField('currentPassword');
                setIsAuthenticated(false);
            }}
        >
            <h1 className={'mx-2 mb-6 text-xl font-semibold'}>계정 탈퇴</h1>
            <div className={'flex flex-col gap-y-5'}>
                <div className={`w-full ${isAuthenticated ? 'opacity-75' : 'opacity-100'}`}>
                    <div className={'mb-6 flex w-full flex-col'}>
                        <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'currentPasswordInput'}>
                            사용자 인증
                        </label>
                        <div className={'flex gap-x-3'}>
                            <input
                                className={
                                    'flex-1 rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'
                                }
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
                                    'flex cursor-pointer items-center justify-center rounded-xl border border-rose-700 px-5 py-1 font-semibold text-rose-700 shadow transition-all hover:bg-gray-50'
                                }
                                type={'button'}
                                onClick={handleAuthenticationButtonClick}
                            >
                                인증
                            </button>
                        </div>
                        {errors?.currentPassword?.message && errors.currentPassword?.type === 'required' && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.currentPassword.message}</span>
                        )}
                    </div>
                </div>
                <div className={`w-full ${isAuthenticated ? 'opacity-100' : 'opacity-75'} flex flex-col`}>
                    <div className={'flex flex-col'}>
                        <span className={'mx-2 mb-2 font-semibold'}>주의 사항</span>
                        <span className={'mx-2 text-red-500'}>
                            탈퇴 후에도 회원님이 작성하신 게시물은 유지됩니다. <br /> 탈퇴 후에는 계정을 복구하실 수
                            없습니다.
                            <br />
                            <br />
                            탈퇴하시겠습니까?
                        </span>
                    </div>
                </div>
                <div className={'flex w-full items-center justify-end gap-x-3'}>
                    <button
                        className={
                            'rounded-lg border border-rose-700 bg-white px-5 py-2 font-semibold text-rose-700 transition-all hover:bg-rose-50'
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
                            'rounded-lg border border-rose-700 bg-rose-700 px-5 py-2 font-semibold text-white transition-all enabled:hover:bg-rose-900 disabled:opacity-75'
                        }
                        type={'button'}
                        disabled={!isAuthenticated}
                        onClick={handleWithdrawButtonClick}
                    >
                        탈퇴
                    </button>
                </div>
            </div>
        </Modal>
    );
}
