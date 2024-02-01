export interface FileData {
    id: number;
    originalFileName: string;
    saveFileName: string;
    saveFilePath: string;
}

export interface CommentData {
    id: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}

export interface AboutMeBoardData {
    id: number;
    title: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    username: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}
