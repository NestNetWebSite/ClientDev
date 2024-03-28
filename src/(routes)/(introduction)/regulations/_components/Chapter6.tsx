export default function Chapter6() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-secondary'}>제 6장 재 정</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 13조 (재정 분류)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 동아리의 재정은 다음과 같은 항목으로 충당된다.</li>
                        <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                            <li>회 비</li>
                            <li>학교 보조금</li>
                        </ul>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 14조 (회비)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>회원은 학기 당 1회 15,000원 회비납부의 의무가 있다.</li>
                        <li>
                            기간은 학기 중으로 한다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>
                                    총무는 회비 납부 의무를 동아리 회원들에게 공표할 의무가 있으며, 성실한 회비 납부
                                    의무 이행을 안한 회원(장기 연체 및 체납)을 회장 및 부회장 혹은 동아리 회원 전체에게
                                    알릴 수 있는 권한이 존재한다.
                                </li>
                            </ul>
                        </li>
                        <li>
                            제 15조와 관련하여, 회비 및 추가 활동비를 모금할 경우, 총무는 2주 전 동아리 회원들에게
                            공지해야한다.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 15조 (연체)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            회비 관련하여, 주어진 기간 내에 납부하지 않을 경우에 5000원의 추가 연체료가 발생한다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>추가적인 연체 시에는 매 월 10%의 연체 이자가 붙는다.</li>
                            </ul>
                        </li>
                        <li>
                            추가 활동비의 경우 2주 간의 유예기간을 준 후, 이 후 납입하지 않을 경우에 위의 내용과
                            동일하게 처리한다.
                        </li>
                        <li>단, 이 부분은 납부 기간 내에 총무에게 얘기를 하면 기간 연장이 가능하다. (최대 1개월)</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 16조 (회계 연도)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>회계 연도는 한 학기로 한다.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 17조 (회계 지출)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>회비를 사용하는 모든 지출은 본 동아리 임원 회의에서 결정해야 한다.</li>
                        <li>회비 사용 내역 관련하여 총무는 동아리 회원들에게 알려줄 의무가 있다.</li>
                        <li>
                            동아리 회원들은 회비 사용 방향에 대해 총무에게 건의가 가능하다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>예) 비품 구입 요청, 장비 수리 요청 등</li>
                                <li>해당 내용은 총무가 우선 검토 후에 승인하거나 임원들에게 알려줄 수 있다.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
