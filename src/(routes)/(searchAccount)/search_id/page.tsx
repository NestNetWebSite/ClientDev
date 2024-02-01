import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { EMAIL_REGEXP } from '../../../_constants/accountRegexp/accountRegexps.ts';

interface FormData {
    name: string;
    emailAddress: string;
}

export default function Page() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            const response = await axios.post(`/member/find-id`, data);
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
                <div className={'mb-10 flex w-full flex-col gap-y-8'}>
                    <div>
                        <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                            <FiUser className={'ml-1 h-7 w-7'} />
                            <input
                                className={'flex-1 rounded-xl p-3 focus:outline-none'}
                                type={'text'}
                                placeholder={'이름'}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                {...register('name', {
                                    required: { value: true, message: '이름을 입력해주세요.' },
                                })}
                            />
                        </div>
                        {errors?.name?.message && errors?.name?.type === 'required' && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.name.message}</span>
                        )}
                    </div>
                    <div>
                        <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                            <MdOutlineEmail className={'ml-1 h-7 w-7'} />
                            <input
                                className={'flex-1 rounded-xl p-3 focus:outline-none'}
                                type={'email'}
                                placeholder={'이메일'}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                {...register('emailAddress', {
                                    required: { value: true, message: '이메일을 입력해주세요.' },
                                    pattern: { value: EMAIL_REGEXP, message: '유효한 이메일 주소를 입력해주세요.' },
                                })}
                            />
                        </div>
                        {errors?.emailAddress?.message && errors?.emailAddress?.type === 'required' && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.emailAddress.message}</span>
                        )}
                        {errors?.emailAddress?.message && errors?.emailAddress?.type === 'pattern' && (
                            <span className={'m-1 text-sm text-red-500'}>※ {errors.emailAddress.message}</span>
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
                        아이디 조회
                    </button>
                </div>
            </form>
        </main>
    );
}
