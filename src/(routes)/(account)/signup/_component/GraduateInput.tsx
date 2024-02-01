import { useFormContext } from 'react-hook-form';
import { FiCalendar } from 'react-icons/fi';

interface FormData {
    graduateYear: number | null;
}

export default function GraduateInput() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div className={'w-full'}>
            <div className={'flex w-full items-center rounded-xl border border-gray-300 px-2 py-1'}>
                <FiCalendar className={'ml-1 h-7 w-7'} />
                <input
                    className={'flex-1 rounded-xl p-3 focus:outline-none'}
                    type={'number'}
                    placeholder={'졸업 년도'}
                    onWheel={event => {
                        event.currentTarget.blur();
                    }}
                    autoComplete={'off'}
                    {...register('graduateYear', {
                        required: { value: true, message: '졸업 연도를 입력해주세요.' },
                        validate: {
                            outOfRange(value) {
                                if (value) {
                                    return (
                                        (value >= 2000 && value <= new Date().getFullYear()) ||
                                        '졸업 연도 범위는 2000년 이상 현재 연도 이하 입니다.'
                                    );
                                }
                            },
                        },
                    })}
                />
            </div>
            {errors?.graduateYear?.message && errors?.graduateYear?.type === 'required' && (
                <span className={'m-1 text-sm text-red-500'}>※ {errors.graduateYear.message}</span>
            )}
            {errors?.graduateYear?.message && errors?.graduateYear?.type === 'outOfRange' && (
                <span className={'m-1 text-sm text-red-500'}>※ {errors.graduateYear.message}</span>
            )}
        </div>
    );
}
