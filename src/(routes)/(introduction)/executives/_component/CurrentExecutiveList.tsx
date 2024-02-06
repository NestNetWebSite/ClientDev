import ExecutiveListItem from '../../_component/ExecutiveListItem.tsx';

interface Executive {
    id: number;
    year: number;
    name: string;
    studentId: string;
    role: string;
}

interface Props {
    currentExecutiveList: Executive[];
}

export default function CurrentExecutiveList({ currentExecutiveList }: Props) {
    return (
        <ul className={'mb-10 grid w-full grid-cols-2 gap-10'}>
            {currentExecutiveList.map(executive => {
                return <ExecutiveListItem key={executive.id} {...executive} />;
            })}
        </ul>
    );
}
