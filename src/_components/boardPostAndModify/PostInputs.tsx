import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import QuillToolbar, { formats, modules } from './QuillToolBar.tsx';
import 'react-quill/dist/quill.snow.css';

interface FormData {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    title: string;
    bodyContent: string;
}

export default function PostInputs() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<FormData>();

    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'flex w-full flex-col gap-y-1'}>
                <input
                    className={'w-full rounded-lg bg-white px-4 py-3  outline outline-1 outline-gray-300'}
                    id={'titleInput'}
                    placeholder={'제목 (최대 40자)'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('title', {
                        required: { value: true, message: '게시글 제목을 입력해주세요.' },
                        maxLength: { value: 40, message: '최대 40자까지 입력 가능합니다.' },
                    })}
                />
                {errors?.title?.message && errors?.title?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.title.message}</span>
                )}
                {errors?.title?.message && errors?.title?.type === 'maxLength' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.title.message}</span>
                )}
            </div>
            <div className={'flex w-full flex-col'}>
                <Controller
                    control={control}
                    name={'bodyContent'}
                    rules={{
                        validate: {
                            required(value) {
                                if (value === undefined) {
                                    return '게시글 내용을 입력해주세요.';
                                }
                                return value.length !== 0 || '게시글 내용을 입력해주세요.';
                            },
                        },
                    }}
                    render={({ field }) => {
                        return (
                            <>
                                <QuillToolbar />
                                <ReactQuill
                                    theme={'snow'}
                                    modules={modules}
                                    formats={formats}
                                    defaultValue={field.value}
                                    placeholder={'게시글 내용을 입력해주세요.'}
                                    className={'h-[26rem] rounded-lg border border-gray-300'}
                                    onChange={(content: string) => {
                                        if (content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                                            field.onChange('');
                                        } else {
                                            field.onChange(content);
                                        }
                                    }}
                                    onBlur={field.onBlur}
                                />
                            </>
                        );
                    }}
                />
                {errors?.bodyContent?.message && errors?.bodyContent?.type === 'required' && (
                    <span className={'m-1 text-sm text-red-500'}>※ {errors.bodyContent.message}</span>
                )}
            </div>
        </div>
    );
}
