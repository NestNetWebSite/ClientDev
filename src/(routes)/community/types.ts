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

export interface UnifiedBoardData {
    id: number;
    title: string;
    bodyContent: string;
    unifiedPostType: string;
    viewCount: number;
    likeCount: number;
    username: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
    memberLoginId: string;
}
