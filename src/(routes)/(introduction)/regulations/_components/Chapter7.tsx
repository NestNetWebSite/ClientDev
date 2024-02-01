export default function Chapter7() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-rose-700'}>제 7장 회칙개정</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 18조 (회칙개정)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 동아리의 회칙 수정 및 개정안은 회장 또는 임원진의 1/4이상으로 발의된다.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 19조 (의결)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            발의된 수정 및 개정안은 임원회에 회부되며, 임원회의 내부 과반수 이상 출석과 출석인원의 2/3
                            이상의 찬성으로 의결된다.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 20조 (효력발생)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            회칙 수정 및 개정안이 통과되면, 회장은 즉시 이를 공포해야 하며, 공포와 동시에 효력이
                            발생된다.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
