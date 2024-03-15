import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

interface DescriptionData {
    title: string;
    bodyContent: string;
}

export default memo(function DescriptionInputs() {
    const {
        register,
        formState: { errors },
    } = useFormContext<DescriptionData>();

    return (
        <>
            {/* 제목 작성란 */}
            <label htmlFor='title'>
                {errors.title?.message && errors?.title?.type === 'required' && (
                    <span className={'m-1 text-sm text-secondary'}>※ {errors.title.message}</span>
                )}
                {errors.title?.message && errors?.title?.type === 'maxLength' && (
                    <span className={'m-1 text-sm text-secondary'}>※ {errors.title.message}</span>
                )}
                <input
                    id='title'
                    type='text'
                    placeholder={'제목 추가'}
                    autoComplete={'off'}
                    className={`title mb-2 w-full rounded-3xl bg-slate-100 py-3 pl-6 font-medium text-black outline-secondary 
                placeholder:font-medium placeholder:text-stone-500 focus:font-medium focus:placeholder:text-slate-400`}
                    {...register('title', {
                        required: { value: true, message: '게시글 제목을 입력해주세요.' },
                        maxLength: { value: 40, message: '최대 40자까지 입력 가능합니다.' },
                    })}
                />
            </label>
            {/* 본문 작성란 */}
            <label htmlFor='bodyContent'>
                {errors.bodyContent?.message && errors?.bodyContent?.type === 'required' && (
                    <span className={'m-1 text-sm text-secondary'}>※ {errors.bodyContent.message}</span>
                )}
                {errors.bodyContent?.message && errors?.bodyContent?.type === 'maxLength' && (
                    <span className={'m-1 text-sm text-secondary'}>※ {errors.title.message}</span>
                )}
                <textarea
                    id='bodyContent'
                    placeholder={'상세 설명을 작성'}
                    className={`BodyContent mb-2 h-[6rem] w-full rounded-3xl bg-slate-100 px-6 py-3 font-medium text-black outline-secondary 
                placeholder:font-medium placeholder:text-stone-500 resize-none focus:font-medium focus:placeholder:text-slate-400`}
                    autoComplete={'off'}
                    {...register('bodyContent', {
                        required: { value: true, message: '게시글 본문을 입력해주세요.' },
                        maxLength: { value: 40, message: '최대 65자까지 입력 가능합니다.' },
                    })}
                />
            </label>
        </>
    );
});
