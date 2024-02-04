import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

interface FormData {
    unifiedPostType: string;
}

const unifiedPostTypeOptions = [
    { value: 'FREE', label: '자유' },
    { value: 'DEV', label: '개발' },
    { value: 'CAREER', label: '진로' },
    { value: 'JOB_INFO', label: '취업 정보' },
];

export default function CategoryInput() {
    const { control } = useFormContext<FormData>();

    return (
        <Controller
            control={control}
            name={'unifiedPostType'}
            rules={{ required: { value: true, message: '카테고리를 선택해주세요.' } }}
            render={({ field }) => {
                return (
                    <Select
                        isSearchable={false}
                        inputId={'categoryInput'}
                        placeholder={'필수 선택'}
                        defaultValue={
                            field.value ? unifiedPostTypeOptions.find(option => option.value === field.value) : null
                        }
                        options={unifiedPostTypeOptions}
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
                                } !px-2 !rounded-xl !h-[3rem] !border !bg-white !text-sm !shadow-none !transition-all`;
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
    );
}
