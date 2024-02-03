import { useRef } from 'react';

export default function DescriptionInput({ bodyContent, setBodyContent }) {
    const descriptionInputRef = useRef(null);

    // 게시물 본문 작성
    const handleBodyContentChange = () => {
        let bodyContentInput = descriptionInputRef.current.value;
        setBodyContent(bodyContentInput);
    };

    return (
        <>
            <textarea
                type={'text'}
                minLength={4}
                maxLength={65}
                value={bodyContent}
                placeholder={'사진들에 대한 상세 설명을 작성'}
                onChange={handleBodyContentChange}
                className={`Description mb-2 h-[6rem] w-full rounded-3xl bg-slate-100 px-6 py-3 font-medium text-black outline-secondary 
                    placeholder:font-medium placeholder:text-stone-500 focus:font-medium focus:placeholder:text-slate-400`}
                autoComplete={'off'}
                ref={descriptionInputRef}
            />
        </>
    );
}
