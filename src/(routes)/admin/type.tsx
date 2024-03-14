export interface IMember {
    id: number;
    name: string;
    loginId: string;
    email: string;
    studentId: string;
    grade: number;
    graduateYear: number;
    memberAuthority: string;
}

export interface ISignupReq {
    name: string;
    loginId: string;
    studentId: string;
    grade: number;
    graduateYear: number;
    memberAuthority: string;
}
