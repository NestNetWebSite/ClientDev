import { useState } from 'react';
import MemberList from './_components/MemberList';
import SignupReqList from './_components/SignupReqList';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

/**
 * 동아리원 관리 영역 페이지
 * @returns
 */
export default function Page() {
    const [alignment, setAlignment] = useState('members');

    // 토글버튼 핸들러
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <>
            <div className='w-full pl-[14rem] pt-20'>
                <div className='MainView flex h-full w-full flex-col justify-evenly px-9 py-6'>
                    <div className='text-right'>
                        <ToggleButtonGroup
                            color='secondary'
                            size='small'
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label='Platform'
                        >
                            <ToggleButton value='members'>전체 회원</ToggleButton>
                            <ToggleButton value='signupReqs'>회원가입 요청</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <section>
                        {alignment === 'members' ? (
                            <article className='memberList flex flex-col'>
                                <h1 className='-mt-6 mb-4 ml-2 text-lg font-semibold text-[#111111]'>전체 회원</h1>
                                <MemberList />
                            </article>
                        ) : (
                            <article className='signupReqList flex flex-col'>
                                <h1 className='-mt-6 mb-4 ml-2 text-lg font-semibold text-[#111111]'>회원가입 요청</h1>
                                <SignupReqList />
                            </article>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
