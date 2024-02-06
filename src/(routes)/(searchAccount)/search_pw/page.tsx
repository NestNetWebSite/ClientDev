import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

export default function Page() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<{ loginId: string }>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<{ loginId: string }> = async data => {
        try {
            const response = await axios.post('/api/member/get-temp-pw', data);
            window.alert(response.data.response);
            navigate('/signin', { replace: true });
        } catch (error) {
            //@ts-ignore
            const errorMessage = error.response.data.error.message;
            window.alert(errorMessage);
        }
    };

    return (
        <main className={'w-full'}>
            <form className={'flex w-full flex-col items-center'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'mb-10 w-full'}>
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
                        {errors?.loginId?.message && errors?.loginId?.type === 'required' && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.loginId.message}</span>
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
                        비밀번호 조회
                    </button>
                </div>
            </form>
        </main>
    );
}
