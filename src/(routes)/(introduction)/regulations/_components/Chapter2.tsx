export default function Chapter2() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-rose-700'}>제 2장 회원</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 3조 (회원구성)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>본 동아리의 회원을 정회원으로 구성된다.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 4조 (회원자격)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            정회원 : "충북대학교 소프트웨어학과" (편입생, 전과생, 복수전공생을 포함한) 재학생만으로
                            한다.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 4조 (회원자격)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            정회원 : "충북대학교 소프트웨어학과" (편입생, 전과생, 복수전공생을 포함한) 재학생만으로
                            한다.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 5조 (회원의 권리와 의무)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            본 동아리의 회장을 포함한 모든 회원은 본 동아리의 행사와 활동에 참여할 권리와 의무가 있다.
                        </li>
                        <li>
                            1인당 프로젝트 활동을 1년에 1회 이상 수행하여야 한다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>
                                    상기 사항에 관하여 모든 동아리 회원들은{' '}
                                    <a
                                        className={'text-rose-700'}
                                        href={'https://github.com/CBNU-Nnet'}
                                        target={'_blank'}
                                    >
                                        Nest.Net Github 페이지
                                    </a>
                                    와{' '}
                                    <a className={'text-rose-700'} href={'http://nnet.cbnu.ac.kr/'} target={'_blank'}>
                                        Nest.Net 홈페이지
                                    </a>
                                    에 필히 가입할 의무를 갖는다.
                                </li>
                            </ul>
                        </li>
                        <li>프로젝트 활동을 하는 회원들은 필히 프로젝트 활동 결과물을 생성하여야 한다.</li>
                        <li>모든 회원은 동아리방 청소 활동에 필수적으로 참여하도록 한다.</li>
                        <li>
                            모든 동아리 임원은 회의 참석의 의무를 지닌다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>회의 불참 : 10,000원</li>
                                <li>회의 지각(5분 이후) : 3,000원</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 6조 (탈퇴 및 제명)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            본 동아리의 취지에 어긋나는 행동을 하는 회원에 대하여 본 동아리의 계속적인 운영을 위해
                            다음과 같은 조치를 취할 수 있다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>
                                    제명 : 본 동아리의 운영과 화합에 지장을 초래하는 (회원 간의 비난, 욕설 혹은 이간질
                                    및 활동 저조 등을 포함한) 회원은 회장과 부회장의 권한으로 제명할 수 있다.
                                </li>
                                <li>
                                    탈퇴 : 본 동아리의 활동을 계속할 의사가 없는 회원은 자진 탈퇴를 할 수 있다. (단,
                                    지불한 회비는 돌려받지 아니한다.)
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
