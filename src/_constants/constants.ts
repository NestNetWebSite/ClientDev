// 기존 등록 사진 여부
export const ORIGINAL_FILE_FLAG: string = 'originalFileName';

// 사진게시판 사진 파일 제한 용량
export const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

// 페이지 라우팅
export const PAGE_ROUTE = Object.freeze({
    PHOTOALBUMS: 'photo-album',
    HISTORY: 'history',
    PROFESSOR: 'professor',
    EXECUTIVES: 'executives',
    FORMER_EXECUTIVES: 'former-executives',
    COMMUINTY: 'community',
    EXAM: 'exam',
    NOTICE: 'notice',
    ABOUT_ME: 'about_me',
    REGULATIONS: 'regulations',
});

// 권한
const AVAIL_AUTHORITY = ['회장', '부회장', '관리자', '재학생', '휴학생', '졸업생'];
// 권한 영->한 전환
export const AUTHORITY_ENG_TO_KOR = Object.freeze({
    PRESIDENT: '회장',
    VICE_PRESIDENT: '부회장',
    MANAGER: '관리자',
    GENERAL_MEMBER: '재학생',
    ON_LEAVE_MEMBER: '휴학생',
    GRADUATED_MEMBER: '졸업생',
    WAITING_FOR_APPROVAL: '승인대기',
    WITHDRAWN_MEMBER: '탈퇴',
    // UNKNOWN: "알수없음",
});
// 권한 한->영 전환
export const AUTHORITY_KOR_TO_ENG = Object.freeze({
    회장: 'PRESIDENT',
    부회장: 'VICE_PRESIDENT',
    관리자: 'MANAGER',
    재학생: 'GENERAL_MEMBER',
    휴학생: 'ON_LEAVE_MEMBER',
    졸업생: 'GRADUATED_MEMBER',
    승인대기: 'WAITING_FOR_APPROVAL',
    탈퇴: 'WITHDRAWN_MEMBER',
    // 알수없음: "UNKNOWN",
});

// 동아리원 목록, 회원가입 요청 목록 테이블 컬럼
export const TABLE_COL_NAME = Object.freeze({
    member: (validationErrors: Record<string, string | undefined>) => [
        {
            accessorKey: 'name',
            header: '성명',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'loginId',
            header: '아이디',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'emailAddress',
            header: '이메일',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'studentId',
            header: '학번',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'grade',
            header: '학년',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'graduateYear',
            header: '졸업년도',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'memberAuthority',
            header: '권한',
            editVariant: 'select',
            editSelectOptions: AVAIL_AUTHORITY,
            size: 50,
            maxSize: 50,
            muiEditTextFieldProps: {
                select: true,
                error: !!validationErrors?.state,
                helperText: validationErrors?.state,
            },
        },
    ],
    signup: [
        {
            accessorKey: 'name',
            header: '성명',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'loginId',
            header: '아이디',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'studentId',
            header: '학번',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'grade',
            header: '학년',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'graduateYear',
            header: '졸업년도',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
        {
            accessorKey: 'memberAuthority',
            header: '권한',
            enableEditing: false,
            size: 50,
            maxSize: 50,
        },
    ],
});

// 얼럿 메시지
export const WINDOW_ALERT_MESSAGE = Object.freeze({
    authorityChange: (row, values) =>
        `${values.name}님의 권한을 ${row.original.memberAuthority}에서 ${values.memberAuthority}(으)로 변경하시겠습니까?`,
    memberDeletion: row => `${row.original.name}님을 정말 탈퇴시키시겠습니까?`,
    signupApproval: original => `${original.name}님의 회원가입 요청을 승인하시겠습니까?`,
    signupReject: original => `${original.name}님의 회원가입 요청을 거절하시겠습니까?`,
});
