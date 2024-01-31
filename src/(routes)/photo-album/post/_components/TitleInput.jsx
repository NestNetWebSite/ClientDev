import { useRef, memo } from 'react';

export default memo(function TitleInput({ title, setTitle }) {
    const titleInputRef = useRef(null);

    // 게시물 제목 작성
    const handleTitleChange = () => {
        let titleInputValue = titleInputRef.current.value;
        setTitle(titleInputValue);
    };

    return (
        <>
            <input
                type={'text'}
                value={title}
                minLength={4}
                maxLength={30}
                onChange={handleTitleChange}
                placeholder={'제목 추가'}
                autoComplete={'off'}
                ref={titleInputRef}
                className={`title mb-2 w-full rounded-3xl bg-slate-100 py-3 pl-6 font-medium text-black outline-secondary 
                    placeholder:font-medium placeholder:text-stone-500 focus:font-medium focus:placeholder:text-slate-400`}
            />
        </>
    );
});
