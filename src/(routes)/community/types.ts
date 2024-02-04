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

export interface UnifiedBoardData {
    id: number;
    title: string;
    bodyContent: string;
    unifiedPostType: string;
    viewCount: number;
    likeCount: number;
    userName: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}
