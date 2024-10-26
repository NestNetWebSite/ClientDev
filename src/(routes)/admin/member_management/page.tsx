// PAGE: 홈페이지 회원 관리 페이지
import { useState } from 'react';
import MemberList from './_components/MemberList';
import SignupReqList from './_components/SignupReqList';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Page() {
    const [currentListView, setCurrentListView] = useState('members'); // DEFAULT: 전체 회원 목록

    // HANDLER: 토글버튼
    const handleChangeCurrentListView = (newCurrentListView: string) => {
        if (newCurrentListView !== null) {
            setCurrentListView(newCurrentListView);
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
                            value={currentListView}
                            exclusive
                            onChange={(_, newCurrentListView) => handleChangeCurrentListView(newCurrentListView)}
                            aria-label='Platform'
                        >
                            <ToggleButton value='members'>전체 회원</ToggleButton>
                            <ToggleButton value='signupReqs'>회원가입 요청</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <section>
                        {currentListView === 'members' ? (
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
