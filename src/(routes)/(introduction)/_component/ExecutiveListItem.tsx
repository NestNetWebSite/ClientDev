interface Props {
    id: number;
    year: number;
    name: string;
    studentId: string;
    role: string;
}

export default function ExecutiveListItem({ studentId, name, role }: Props) {
    return (
        <li className={'flex flex-col rounded-xl border border-gray-200 p-6 shadow-xl'}>
            <div className={'flex w-full justify-end'}>
                <img className={'w-16'} src={'/_assets/images/nestNet-image-logo.png'} alt={'nestNetLogo'} />
            </div>
            <div className={'mb-4'}>
                <span className={'text-2xl font-bold tracking-wider'}>{name}</span>
            </div>
            <div className={'flex flex-col gap-y-1'}>
                <span className={'text-[1.05rem]'}>
                    학번 : <span className={'font-bold text-gray-500'}>{studentId}</span>
                </span>
                <span className={'text-[1.05rem]'}>
                    직책 : <span className={'font-bold text-rose-700'}>{role}</span>
                </span>
            </div>
        </li>
    );
}
