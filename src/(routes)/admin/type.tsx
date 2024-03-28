import { MRT_Row } from 'material-react-table';

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

export interface ISignupReq {
    name: string;
    loginId: string;
    studentId: string;
    grade: number;
    graduateYear: number;
    memberAuthority: string;
}
