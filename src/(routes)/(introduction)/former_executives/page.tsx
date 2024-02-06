import { useQuery } from '@tanstack/react-query';
import FormerExecutiveListWithFilter from './_component/FormerExecutiveListWithFilter.tsx';
import getFormerExecutives from './_lib/getFormerExecutives.ts';
import ServerErrorPage from '../../_errors/_components/ServerErrorPage.tsx';

export default function Page() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['executives', 'former'],
        queryFn: getFormerExecutives,
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
                <h1 className={'text-3xl font-bold text-rose-700'}>네스트넷 전 임원 소개</h1>
            </div>
            <FormerExecutiveListWithFilter
                yearList={Array.from(new Set(data.dtoList.map(executive => executive.year)))}
                formerExecutiveList={data.dtoList}
            />
        </main>
    );
}
