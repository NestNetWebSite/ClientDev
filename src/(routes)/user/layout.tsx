import { Outlet, useParams } from 'react-router-dom';
import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Profile from './_components/Profile.tsx';
import AccountManagement from './_components/AccountManagement.tsx';
import SideNavbar from './_components/SideNavbar.tsx';
import getUserInfo from './_lib/getUserInfo.ts';
import UserActivityApiErrorFallback from '../_errors/_components/UserApiErrorFallback.tsx';
import LoadingSpinner from '../../_components/loadingSpinner/LoadingSpinner.tsx';

interface UserInfo {
    id: number;
    loginId: string;
    name: string;
    emailAddress: string;
    studentId: string;
    memberAuthority: string;
    grade: number;
    graduateYear: number;
    loginMember: boolean;
}

export default function Layout() {
    const userId = useParams().userId ?? '';
    const { reset } = useQueryErrorResetBoundary();
    const {
        data: userInfo,
        isLoading,
        isFetching,
    } = useQuery<UserInfo>({
        queryKey: ['user', userId],
        queryFn: getUserInfo,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
        throwOnError: true,
    });

    return (
        <>
            {isLoading || isFetching ? (
                <LoadingSpinner size={70} />
            ) : (
                <main className={'mx-auto mt-8 flex w-[75rem] justify-center gap-x-6 p-4'}>
                    <div className={'flex h-fit w-[15.5rem] flex-col rounded-xl px-5 py-2'}>
                        <Profile
                            name={userInfo.name}
                            emailAddress={userInfo.emailAddress}
                            memberAuthority={userInfo.memberAuthority}
                            grade={userInfo.grade}
                            graduateYear={userInfo.graduateYear}
                            studentId={userInfo.studentId}
                        />
                        {userInfo.loginMember && (
                            <>
                                <hr />
                                <h3 className={'mx-1.5 mb-6 mt-7 w-full text-left text-base font-bold'}>계정 관리</h3>
                                <AccountManagement
                                    name={userInfo.name}
                                    emailAddress={userInfo.emailAddress}
                                    studentId={userInfo.studentId}
                                    loginId={userInfo.loginId}
                                    grade={userInfo.grade}
                                />
                            </>
                        )}
                    </div>
                    <div className={'flex w-[50rem] flex-col gap-y-2 rounded-xl border border-gray-200 shadow-lg'}>
                        <SideNavbar />
                        <ErrorBoundary onReset={reset} FallbackComponent={UserActivityApiErrorFallback}>
                            <Outlet context={{ id: userInfo.id }} />
                        </ErrorBoundary>
                    </div>
                </main>
            )}
        </>
    );
}
