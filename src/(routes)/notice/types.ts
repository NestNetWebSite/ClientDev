export interface FileData {
    id: number;
    originalFileName: string;
    saveFileName: string;
}

export interface CommentData {
    commentId: number;
    memberLoginId: string;
    memberAuthority: string;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}

export interface NoticeBoardData {
    id: number;
    title: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    username: string;
    createdTime: string;
    modifiedTime: string | null;
    memberWritten: boolean;
    memberLoginId?: string;
}
