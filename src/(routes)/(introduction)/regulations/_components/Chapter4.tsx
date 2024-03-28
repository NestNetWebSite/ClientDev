export default function Chapter4() {
    return (
        <div className={'flex flex-col gap-y-4'}>
            <h1 className={'text-2xl font-semibold text-secondary'}>제 4장 동아리 방 내 준수 사항</h1>
            <hr />
            <div className={'flex flex-col gap-y-16'}>
                <div>
                    <h3 className={'mb-3 text-xl font-bold'}>제 10조 (준수사항)</h3>
                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                        <li>
                            동아리방 (이하 "동방") 내에서 동아리 정회원들은 다음과 같은 준수 사항을 지켜야 한다.
                            <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                <li>동방 내 흡연 및 음주를 금한다.</li>
                                <li>동방 내에서 선·후배 간 예의를 지킨다.</li>
                                <li>타인의 물건에 허락 없이 절대 손대지 아니한다.</li>
                                <li>시험기간 내 동방 사용시 되도록 정숙을 유지하도록 한다.</li>
                                <li>
                                    동방 내 청결을 위해서 자신이 청소조가 아니여도, 솔선수범하여 쓰레기나 필요없는
                                    물건들을 치운다.
                                </li>
                                <li>
                                    냉장고 및 사물함에 취식물을 둔 경우, 유통기한을 확인하여 지난 경우 폐기하도록 한다.
                                </li>
                                <li>
                                    냉장고에 취식물을 두려고 사용할 경우, 포스트 잇을 부착하여 자신의 것임을 알리도록
                                    한다.
                                </li>
                                <li>Nest.Net 소속 회원들이 아닌 타인에게 동방 비밀번호 공유를 금한다.</li>
                                <li>Nest.Net 소속 회원들이 아닌 타인에게 동방 시설 공유를 금한다.</li>
                                <li>
                                    Nest.Net 소속 회원들이 아닌 타인이 동방 출입 시, 허락을 맡고 출입할 수 있게끔 해야
                                    한다.
                                    <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                        <li>만일 해당 인원의 지인이 부재중일 경우에는 출입을 금한다.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            만일, 타인 출입으로 인한 도난 및 분실 혹은 기타 사고 발생 시에는 해당 인원의 지인인 동아리
                            회원의 제 10조 이행 여부를 판단한 후 제 6조에 의거하여 회장 혹은 부회장 권한으로 제명이
                            가능하다.
                        </li>
                        <li>
                            타인이 출입하지 않은 경우의 동방 내 사건·사고에 관해서도 해당 동아리 회원의 제 10조 이행
                            여부를 판단한 후 제 6조에 의거하여 회장 혹은 부회장 권한으로 제명이 가능하다.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
