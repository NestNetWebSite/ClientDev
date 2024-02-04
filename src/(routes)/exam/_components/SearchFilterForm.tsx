import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import useExamSearchFilterStore from '../../../_stores/useExamSearchFilterStore';

interface ExamSearchFilter {
    year: string;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

type FormData = ExamSearchFilter;

interface Props {
    updateCurrentSearchFilter: (newSearchFilter: ExamSearchFilter) => void;
    closeModal: () => void;
}

const semesterSelectOptions = [
    { value: '1', label: '1학기' },
    { value: '2', label: '2학기' },
    { value: '0', label: '선택안함.' },
];

const examTypeSelectOptions = [
    { value: 'MID', label: '중간고사' },
    { value: 'FINAL', label: '기말고사' },
    { value: '', label: '선택안함.' },
];

export default function SearchFilterForm({ updateCurrentSearchFilter, closeModal }: Props) {
    const { examSearchFilter, filterUpdate } = useExamSearchFilterStore();
    const { control, register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            year: examSearchFilter.year,
            semester: examSearchFilter.semester,
            examType: examSearchFilter.examType,
            subject: examSearchFilter.subject,
            professor: examSearchFilter.professor,
        },
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        filterUpdate(data);
        updateCurrentSearchFilter(data);
        closeModal();
    };

    return (
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'w-full'}>
                <div className={'mb-10 flex w-full flex-col'}>
                    <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'subjectInput'}>
                        강좌명
                    </label>
                    <input
                        className={'flex-1 rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'}
                        id={'subjectInput'}
                        type={'text'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('subject')}
                    />
                </div>
                <div className={'flex w-full gap-x-6'}>
                    <div className={'w-1/2'}>
                        <div className={'mb-6 flex flex-col'}>
                            <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'yearInput'}>
                                연도
                            </label>
                            <input
                                className={
                                    'flex-1 rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'
                                }
                                id={'yearInput'}
                                type={'number'}
                                min={0}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                onWheel={event => {
                                    event.currentTarget.blur();
                                }}
                                {...register('year')}
                            />
                        </div>
                        <div className={'mb-10 flex flex-col'}>
                            <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'semesterInput'}>
                                학기
                            </label>
                            <Controller
                                control={control}
                                name={'semester'}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            isSearchable={false}
                                            options={semesterSelectOptions}
                                            onChange={option => field.onChange(option.value)}
                                            ref={field.ref}
                                            inputId={'semesterInput'}
                                            value={semesterSelectOptions.find(option => option.value === field.value)}
                                            classNames={{
                                                control() {
                                                    return '!rounded-lg !h-[52px] !border !border-gray-300 !bg-zinc-50 !text-sm !shadow-none';
                                                },

                                                option() {
                                                    return '!text-sm';
                                                },
                                            }}
                                        />
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div className={'w-1/2'}>
                        <div className={'mb-6 flex flex-col'}>
                            <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'examTypeInput'}>
                                시험 종류
                            </label>
                            <Controller
                                control={control}
                                name={'examType'}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            isSearchable={false}
                                            options={examTypeSelectOptions}
                                            onChange={option => field.onChange(option.value)}
                                            ref={field.ref}
                                            inputId={'examTypeInput'}
                                            value={examTypeSelectOptions.find(option => option.value === field.value)}
                                            classNames={{
                                                control() {
                                                    return '!rounded-lg !h-[52px] !border !border-gray-300 !bg-zinc-50 !text-sm !shadow-none';
                                                },

                                                option() {
                                                    return '!text-sm';
                                                },
                                            }}
                                        />
                                    );
                                }}
                            />
                        </div>
                        <div className={'flex w-full flex-col'}>
                            <label className={'mx-2 mb-2 w-fit font-semibold'} htmlFor={'professorInput'}>
                                교수명
                            </label>
                            <input
                                className={
                                    'flex-1 rounded-lg border border-gray-300 bg-zinc-50 px-4 py-3 focus:outline-none'
                                }
                                id={'professorInput'}
                                type={'text'}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                {...register('professor')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'my-2 flex w-full items-center justify-end gap-x-3'}>
                <button
                    className={
                        'rounded-lg border border-rose-800 bg-white px-5 py-2 font-semibold text-rose-800 transition-all hover:bg-rose-50'
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
                        'rounded-lg border border-rose-800 bg-rose-800 px-5 py-2 font-semibold text-white transition-all hover:bg-rose-900'
                    }
                    type={'submit'}
                >
                    적용
                </button>
            </div>
        </form>
    );
}
