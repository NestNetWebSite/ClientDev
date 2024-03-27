export default function Chapter1() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-secondary'}>제 1장 총칙</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 1조 (명칭)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 동아리는 "충북대학교" 학술 동아리 "Nest.Net"이라 한다. (이하 "동아리"라 약칭한다.)</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 2조 (목적)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            본 동아리는 학술 동아리로서 학업에 충실하고 더 나아가 깊은 지식을 탐구하며, 더불어 친목
                            도모를 목적으로 한다.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
