import UserBoardList from './_components/UserBoardList.tsx';
import { useOutletContext } from 'react-router-dom';

export default function Page() {
    // @ts-ignore
    const loginMember = useOutletContext().loginMember;
    return (
        <div className={'h-[37rem] overflow-y-auto'}>
            {loginMember ? (
                <UserBoardList />
            ) : (
                <div className={'flex h-full items-center justify-center'}>
                    <p className={'text-lg font-bold'}>타 회원의 활동 기록입니다.</p>
                </div>
            )}
        </div>
    );
}
