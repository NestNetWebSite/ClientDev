export default function Chapter5() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-rose-700'}>제 5장 모 임</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 11조 (필수 모임)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 동아리는 다음과 같은 모임을 필수적으로 갖는다.</li>
                        <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                            <li>개강 총회</li>
                            <li>종강 총회</li>
                        </ul>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 12조 (총회)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            본 동아리는 정기총회를 둔다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>
                                    정기총회(개강 총회와 종강 총회)는 년 4회 매 학기 초와 말에 개최함을 원칙으로 한다.
                                </li>
                                <li>
                                    총회는 개최 2주일전에 공고하고 총회 장소와 날짜는 정회원(단, 휴학생·졸업생
                                    제외한다.) 과반수 출석과 출석인원 과반수 이상의 찬성으로 의결한다.
                                </li>
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
            </div>
        </div>
    );
}
