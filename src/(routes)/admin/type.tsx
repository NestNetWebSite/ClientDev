import { MRT_Row } from 'material-react-table';

// 회원
export interface IMember {
    id?: number;
    name: string;
    loginId: string;
    emailAddress: string;
    studentId: string;
    grade: number;
    graduateYear: number;
    memberAuthority: string;
}

export interface IEditProps {
    row: MRT_Row<IMember>;
    values: IMember;
}
// 회원가입 요청
export interface ISignupReq {
    name: string;
    loginId: string;
    studentId: string;
    grade: number;
    graduateYear: number;
    memberAuthority: string;
}
