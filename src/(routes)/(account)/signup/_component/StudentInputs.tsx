import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { LiaIdCard } from 'react-icons/lia';
import { PiListNumbersLight } from 'react-icons/pi';

const memberAuthoritySelectOptions = [
    { value: 'PRESIDENT', label: '회장' },
    { value: 'VICE_PRESIDENT', label: '부회장' },
    { value: 'MANAGER', label: '관리자' },
    { value: 'GENERAL_MEMBER', label: '재학생' },
];

interface FormData {
    grade: number | null;
    studentId: string;
    memberAuthority: string;
}

export default function StudentInputs() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <>
            <div className={'w-full'}>
                <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                    <PiListNumbersLight className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-xl p-3 focus:outline-none'}
                        type={'number'}
                        placeholder={'학년'}
                        onWheel={event => {
                            event.currentTarget.blur();
                        }}
                        autoComplete={'off'}
                        {...register('grade', {
                            required: { value: true, message: '학년을 입력해주세요.' },
                            validate: {
                                outOfRange(value) {
                                    if (value) {
                                        return (
                                            (value > 0 && value <= 10) || '학년 범위는 1학년 이상 10학년 이하 입니다.'
                                        );
                                    }
                                },
                            },
                        })}
                    />
                </div>
                {errors?.grade?.message && errors?.grade?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.grade.message}</span>
                )}
                {errors?.grade?.message && errors?.grade?.type === 'outOfRange' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.grade.message}</span>
                )}
            </div>
            <div className={'w-full'}>
                <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                    <LiaIdCard className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-xl p-3 focus:outline-none'}
                        type={'text'}
                        placeholder={'학번'}
                        autoComplete={'off'}
                        {...register('studentId', {
                            required: { value: true, message: '학번을 입력해주세요.' },
                            maxLength: { value: 15, message: '학번은 15자 이하여야 합니다.' },
                        })}
                    />
                </div>
                {errors?.studentId?.message && errors?.studentId?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.studentId.message}</span>
                )}
                {errors?.studentId?.message && errors?.studentId?.type === 'maxLength' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.studentId.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <span className={'mx-2 mb-2 font-semibold'}>권한 선택</span>
                <Controller
                    control={control}
                    name={'memberAuthority'}
                    defaultValue={'GENERAL_MEMBER'}
                    render={({ field }) => {
                        return (
                            <Select
                                classNames={{
                                    control() {
                                        return '!rounded-xl !h-[58px] !border !border-gray-300 !bg-white !border !text-sm !shadow-none';
                                    },

                                    option() {
                                        return '!text-sm';
                                    },
                                }}
                                placeholder={'권한 선택'}
                                options={memberAuthoritySelectOptions}
                                defaultValue={memberAuthoritySelectOptions.find(option => option.value === field.value)}
                                ref={field.ref}
                                onChange={option => field.onChange(option?.value)}
                                menuPlacement={'auto'}
                            />
                        );
                    }}
                />
            </div>
        </>
    );
}
