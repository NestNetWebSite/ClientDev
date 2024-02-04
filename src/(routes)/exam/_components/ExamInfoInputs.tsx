import { useFormContext } from 'react-hook-form';

interface FormData {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
}

export default function ExamInfoInputs() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div>
            <div className={'grid grid-cols-3 gap-x-5 gap-y-5'}>
                <div className={'flex flex-col'}>
                    <label className={'mx-2.5 mb-2 font-bold text-slate-950'} htmlFor={'subjectInput'}>
                        강좌명
                    </label>
                    <input
                        className={'rounded-lg px-4 py-3 outline outline-1 outline-gray-300 transition-all'}
                        id={'subjectInput'}
                        type={'text'}
                        placeholder={'필수 입력'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('subject', {
                            required: { value: true, message: '강좌명을 입력해주세요.' },
                        })}
                    />
                    {errors?.subject?.message && errors?.subject?.type === 'required' && (
                        <span className={'m-1 text-sm text-red-500'}>※ {errors.subject.message}</span>
                    )}
                </div>
                <div className={'flex flex-col'}>
                    <label className={'mx-2.5 mb-2 font-bold text-slate-950'} htmlFor={'professorInput'}>
                        교수명
                    </label>
                    <input
                        className={'rounded-lg px-4 py-3 outline outline-1 outline-gray-300 transition-all'}
                        id={'professorInput'}
                        type={'text'}
                        placeholder={'필수 입력'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('professor', {
                            required: { value: true, message: '교수명을 입력해주세요.' },
                        })}
                    />
                    {errors?.professor?.message && errors?.professor?.type === 'required' && (
                        <span className={'m-1 text-sm text-red-500'}>※ {errors.professor.message}</span>
                    )}
                </div>
                <div className={'flex flex-col'}>
                    <label className={'mx-2.5 mb-2 font-bold text-slate-950'} htmlFor={'yearInput'}>
                        연도
                    </label>
                    <input
                        className={'rounded-lg px-4 py-3 outline outline-1 outline-gray-300 transition-all'}
                        id={'yearInput'}
                        type={'number'}
                        placeholder={'필수 입력'}
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
                <div className={'flex flex-col'}>
                    <span className={'mx-2.5 mb-2 font-bold text-slate-950'}>학기</span>
                    <div className={'flex w-full items-center'}>
                        <input
                            className={'scale-125'}
                            defaultChecked
                            id={'1stSemesterRadioButton'}
                            type={'radio'}
                            value={'1'}
                            {...register('semester')}
                        />
                        <label className={'ml-2 mr-5 text-slate-950'} htmlFor={'1stSemesterRadioButton'}>
                            1학기
                        </label>
                        <input
                            className={'scale-125'}
                            id={'2ndSemesterRadioButton'}
                            type={'radio'}
                            value={'2'}
                            {...register('semester')}
                        />
                        <label className={'ml-2 text-slate-950'} htmlFor={'2ndSemesterRadioButton'}>
                            2학기
                        </label>
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <span className={'mx-2.5 mb-2 font-bold text-slate-950'}>시험 종류</span>
                    <div className={'flex items-center'}>
                        <input
                            className={'scale-125'}
                            defaultChecked
                            id={'midtermRadioButton'}
                            type={'radio'}
                            value={'MID'}
                            {...register('examType')}
                        />
                        <label className={'ml-2 mr-5 text-slate-950'} htmlFor={'midtermRadioButton'}>
                            중간고사
                        </label>
                        <input
                            className={'scale-125'}
                            id={'finalRadioButton'}
                            type={'radio'}
                            value={'FINAL'}
                            {...register('examType')}
                        />
                        <label className={'ml-2 mr-5 text-slate-950'} htmlFor={'finalRadioButton'}>
                            기말고사
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
