export default function Chapter3() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-secondary'}>제 3장 조 직</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 7조 (구성)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>임원진</li>
                        <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                            <li>
                                동아리의 임원진은 회장, 부회장, 홍보/총무 1인, 기획/서기 1인, 서버/비품관리 1인으로
                                구성할 수 있으며, 이는 회장이 조직 개편이 가능하다.
                            </li>
                        </ul>
                        <li>정회원</li>
                        <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                            <li>
                                동아리의 임원진은 회장, 부회장, 홍보/총무 1인, 기획/서기 1인, 서버/비품관리 1인으로
                                구성할 수 있으며, 이는 회장이 조직 개편이 가능하다.
                            </li>
                        </ul>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 8조 (직무)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            임원진
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>회 장: 본 동아리를 대표하며, 모임의 모든 운영을 총괄·관리한다.</li>
                                <li>부회장: 회장을 보좌하며, 유사시 회장의 업무를 대행한다.</li>
                                <li>
                                    홍보/총무: 본 동아리의 모든 재정을 관리하고, 더불어 동아리 홍보에 관련된 업무를
                                    맡는다.
                                </li>
                                <li>기획/서기: 본 동아리의 모든 활동을 기록하고, 행사의 기획을 담당한다.</li>
                                <li>서버/비품관리: 본 동아리의 비품 및 동아리 홈페이지 서버를 관리한다.</li>
                                <li>
                                    정기총회는 다음과 같은 목적을 갖는다.
                                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                        <li>회원들 간의 단합 및 화합</li>
                                        <li>선·후배들 간의 우정</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 9조 (선거와 임기)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            회장, 부회장 외 임원진은 재학생인 자로서 임기는 각 1년으로 한다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>회장은 차기 회장을 임명 가능하며, 차기 회장은 임원진을 임명할 수 있다.</li>
                            </ul>
                        </li>
                        <li>선거는 실시하지 아니한다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
