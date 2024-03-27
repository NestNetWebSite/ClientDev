export default function Chapter8() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-secondary'}>제 8장 활 동</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 21조 (의의)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 동아리는 제2조의 목적을 달성하기 위하여 다음과 같은 행사를 진행한다.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 22조 (행사)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            본 동아리는 다음과 같은 활동을 한다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>M.T.</li>
                                <li>세미나</li>
                                <li>스터디</li>
                                <li>졸업생 초청 세미나</li>
                                <li>벚꽃 놀이</li>
                                <li>동아리 배 볼링 / 당구 대회</li>
                            </ul>
                        </li>
                        <li>
                            다음 활동들의 목적을 달성하고, 행사를 원할하게 진행하기 위해 본 동아리의 임원들은 행사에
                            필수적으로 참가하도록 한다. (불참비 : 30,000원)
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>단, 회장과 부회장의 만장일치되는 허락 하에 불참비를 내지 않고 불참할 수 있다.</li>
                            </ul>
                        </li>
                        <li>그 이외의 회원들은 행사에 자율적으로 참가할 수 있다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
