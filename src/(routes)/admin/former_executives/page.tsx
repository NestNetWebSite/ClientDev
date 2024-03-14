import ExecutivesTable from '../_components/ExecutivesTable.tsx';

export default function Page() {
    return (
        <div className={'pl-[14rem] pt-20'}>
            <h1 className={'px-11 py-10 text-lg font-bold'}>전 임원 관리</h1>
            <ExecutivesTable />
        </div>
    );
}
