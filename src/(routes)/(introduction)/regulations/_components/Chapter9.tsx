export default function Chapter9() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-secondary'}>제 9장 부칙</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 1조</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 회칙은 공포와 동시에 효력을 발생한다.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 2조</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 회칙에 규정되지 않은 것은 통상관례에 의한다.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 3조</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 회칙은 2019년 2월 28일에 효력을 발생한다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
