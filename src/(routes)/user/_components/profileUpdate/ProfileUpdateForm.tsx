import axios from 'axios';
import { isEqual } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REGEXP, ID_REGEXP } from '../../../../_constants/accountRegexp/accountRegexps.ts';

interface Props {
    loginId: string;
    name: string;
    emailAddress: string;
    studentId: string;
    grade: number;
    closeModal: () => void;
}

type FormData = Omit<Props, 'closeModal'>;

export default function ProfileUpdateForm({ loginId, name, emailAddress, studentId, grade, closeModal }: Props) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues: {
            loginId: loginId,
            name: name,
            emailAddress: emailAddress,
            studentId: studentId,
            grade: grade,
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        if (isEqual(data, { loginId, name, emailAddress, studentId, grade })) {
            closeModal();
        } else {
            axios
                .post(`/api/member/modify-info`, data, {
                    withCredentials: true,
                    headers: { Authorization: localStorage.getItem('access_token') },
                })
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ['user information'], exact: true }).then(() => {
                        window.alert('회원 정보가 수정되었습니다');
                    });
                })
                .catch(error => {
                    const errorMessage = error.response.data.error.message;
                    window.alert(errorMessage);
                })
                .finally(() => {
                    closeModal();
                });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-5'}>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'loginIdInput'}>
                    아이디
                </label>
                <input
                    className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                    id={'loginIdInput'}
                    type={'text'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('loginId', {
                        required: { value: true, message: '아이디를 입력해주세요.' },
                        pattern: { value: ID_REGEXP, message: '8~20자의 알파벳, 숫자를 반드시 포함해야 합니다.' },
                    })}
                />
                {errors?.loginId?.message && errors?.loginId?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.loginId.message}</span>
                )}
                {errors?.loginId?.message && errors?.loginId?.type === 'pattern' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.loginId.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'nameInput'}>
                    이름
                </label>
                <input
                    className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                    id={'nameInput'}
                    type={'text'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('name', { required: { value: true, message: '이름을 입력해주세요.' } })}
                />
                {errors?.name?.message && errors?.name?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.name.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'emailAddressInput'}>
                    이메일
                </label>
                <input
                    className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                    id={'emailAddressInput'}
                    type={'email'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('emailAddress', {
                        required: { value: true, message: '이메일을 입력해주세요.' },
                        pattern: { value: EMAIL_REGEXP, message: '유효한 이메일 주소를 입력해주세요.' },
                    })}
                />
                {errors?.emailAddress?.message && errors?.emailAddress?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.emailAddress.message}</span>
                )}
                {errors?.emailAddress?.message && errors?.emailAddress?.type === 'pattern' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.emailAddress.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'studentIdInput'}>
                    학번
                </label>
                <input
                    className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                    id={'studentIdInput'}
                    type={'text'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('studentId', {
                        required: { value: true, message: '학번을 입력해주세요.' },
                        maxLength: { value: 15, message: '학번은 15자 이하여야 합니다.' },
                    })}
                />
                {errors?.studentId?.message && errors?.studentId?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.studentId.message}</span>
                )}
                {errors?.studentId?.message && errors?.studentId?.type === 'maxLength' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.studentId.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'gradeInput'}>
                    학년
                </label>
                <input
                    className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                    id={'gradeInput'}
                    type={'number'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('grade', {
                        required: { value: true, message: '학년을 입력해주세요.' },
                        validate: {
                            outOfRange(value) {
                                return (value > 0 && value <= 10) || '학년 범위는 1학년 이상 10학년 이하 입니다.';
                            },
                        },
                    })}
                    onWheel={event => event.currentTarget.blur()}
                />
                {errors?.grade?.message && errors?.grade?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.grade.message}</span>
                )}
                {errors?.grade?.message && errors?.grade?.type === 'outOfRange' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.grade.message}</span>
                )}
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
                        'rounded-lg border border-rose-700 bg-rose-700 px-5 py-2 font-semibold text-white transition-all hover:bg-rose-800'
                    }
                    type={'submit'}
                >
                    수정
                </button>
            </div>
        </form>
    );
}
