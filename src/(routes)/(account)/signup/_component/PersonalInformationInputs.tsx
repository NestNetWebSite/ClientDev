import { MouseEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';

interface Props {
    onRadioButtonClick: MouseEventHandler<HTMLInputElement>;
}

interface FormData {
    name: string;
    graduated: string | boolean;
}

export default function PersonalInformationInputs({ onRadioButtonClick }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <>
            <div className={'w-full'}>
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
            <div className={'flex w-full flex-col'}>
                <span className={'mx-2 mb-2 font-semibold'}>졸업 여부 선택</span>
                <div className={'flex items-center'}>
                    <GiGraduateCap className={'ml-2.5 h-7 w-7'} />
                    <div className={'mx-4 flex items-center'}>
                        <input
                            className={'scale-125'}
                            type={'radio'}
                            value={'no'}
                            defaultChecked={true}
                            onClick={onRadioButtonClick}
                            {...register('graduated')}
                        />
                        <span className={'ml-2 mr-8 font-semibold'}>졸업 안 함</span>
                        <input
                            className={'scale-125'}
                            type={'radio'}
                            value={'yes'}
                            onClick={onRadioButtonClick}
                            {...register('graduated')}
                        />
                        <span className={'ml-2 mr-8 font-semibold'}>졸업 함</span>
                    </div>
                </div>
            </div>
        </>
    );
}
