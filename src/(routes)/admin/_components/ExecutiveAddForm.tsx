import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

interface Props {
    closeModal: () => void;
}

interface FormData {
    year: number;
    name: string;
    studentId: string;
    role: string;
}

const roleSelectOptions = [
    { value: '회장', label: '회장' },
    { value: '부회장', label: '부회장' },
    { value: '총무', label: '총무' },
    { value: '서버', label: '서버' },
    { value: '기획', label: '기획' },
    { value: '홍보', label: '홍보' },
    { value: '학술', label: '학술' },
    { value: '복지', label: '복지' },
];

export default function ExecutiveAddForm({ closeModal }: Props) {
    const queryClient = useQueryClient();

    const {
        control,
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        mode: 'onBlur',
    });

    const { mutate: addExecutiveMutate } = useMutation({
        mutationFn(formData: FormData) {
            return axios.post(`/api/executive-info/save`, [formData]);
        },

        onSuccess() {
            window.alert('성공적으로 추가하였습니다.');
            reset();
            return queryClient.invalidateQueries({ queryKey: ['executives'] });
        },

        onError() {
            window.alert('추가하는 데 실패하였습니다. 관리자에게 문의해주세요.');
            closeModal();
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        addExecutiveMutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-5'}>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'yearInput'}>
                    연도
                </label>
                <input
                    className={'rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                    id={'yearInput'}
                    type={'number'}
                    onWheel={event => {
                        event.currentTarget.blur();
                    }}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('year', {
                        required: { value: true, message: '연도를 입력해주세요.' },
                        validate: {
                            outOfRange(year) {
                                return (
                                    (year >= 2000 && year <= new Date().getFullYear()) ||
                                    '연도 범위는 2000년도 ~ 현재 연도입니다.'
                                );
                            },
                        },
                    })}
                />
                {errors?.year?.message && errors?.year?.type === 'required' && (
                    <span className={'text-sm text-red-500'}>※ {errors.year.message}</span>
                )}
                {errors?.year?.message && errors?.year?.type === 'outOfRange' && (
                    <span className={'text-sm text-red-500'}>※ {errors.year.message}</span>
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
                    {...register('name', {
                        required: { value: true, message: '이름을 입력해주세요.' },
                    })}
                />
                {errors?.name?.message && errors?.name?.type === 'required' && (
                    <span className={'text-sm text-red-500'}>※ {errors.name.message}</span>
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
                    })}
                />
                {errors?.studentId?.message && errors?.studentId?.type === 'required' && (
                    <span className={'text-sm text-red-500'}>※ {errors.studentId.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'roleInput'}>
                    직책
                </label>
                <Controller
                    control={control}
                    name={'role'}
                    rules={{ required: { value: true, message: '직책을 선택해주세요.' } }}
                    render={({ field }) => {
                        return (
                            <Select
                                isSearchable={false}
                                inputId={'roleInput'}
                                options={roleSelectOptions}
                                onChange={option => {
                                    field.onChange(option.value);
                                }}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                menuPlacement={'auto'}
                                classNames={{
                                    control(state) {
                                        return `${
                                            state.isFocused ? '!border-gray-300' : '!border-gray-300'
                                        } !px-2 !rounded-lg !h-[50px] !border !bg-white !text-sm !shadow-none !transition-all`;
                                    },

                                    option() {
                                        return '!text-sm';
                                    },

                                    placeholder() {
                                        return '!text-[#a9a9a9]';
                                    },
                                }}
                            />
                        );
                    }}
                />
                {errors?.role?.message && errors?.role?.type === 'required' && (
                    <span className={'text-sm text-red-500'}>※ {errors.role.message}</span>
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
                        'rounded-lg border border-rose-700 bg-rose-700 px-5 py-2 font-semibold text-white transition-all hover:bg-rose-800 disabled:opacity-75'
                    }
                    type={'submit'}
                    disabled={isSubmitting}
                >
                    추가
                </button>
            </div>
        </form>
    );
}
