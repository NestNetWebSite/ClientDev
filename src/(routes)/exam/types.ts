export interface FileData {
    id: number;
    originalFileName: string;
    saveFileName: string;
}

export interface CommentData {
    id: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}

export interface ExamBoardData {
    id: number;
    title: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    subject: string;
    professor: string;
    year: number;
    semester: number;
    examType: string;
    userName: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}
