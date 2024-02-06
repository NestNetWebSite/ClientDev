import { useQuery } from '@tanstack/react-query';
import CurrentExecutiveList from './_component/CurrentExecutiveList.tsx';
import getCurrentExecutives from './_lib/getCurrentExecutives.ts';
import ServerErrorPage from '../../_errors/_components/ServerErrorPage.tsx';

export default function Page() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['executives', 'current'],
        queryFn: getCurrentExecutives,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return null;
    }

    if (isError) {
        return <ServerErrorPage retry={() => refetch()} />;
    }

    return (
        <main className={'mx-auto flex w-[55rem] flex-col p-5'}>
            <div className={'mb-6 border-b-2 border-rose-700 pb-2'}>
                <h1 className={'text-3xl font-bold text-rose-700'}>네스트넷 현 임원 소개</h1>
            </div>
            <CurrentExecutiveList currentExecutiveList={data.dtoList} />
        </main>
    );
}
