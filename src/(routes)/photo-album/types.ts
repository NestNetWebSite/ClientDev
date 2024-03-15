export interface IPhotoAlbumMetaData {
    id: number;
    title: string;
    viewCount: number;
    likeCount: number;
    saveFileName: string;
    saveFilePath: string;
}

export interface IPhotoPostDto {
    id: number;
    title: string;
    bodyContent: string;
    viewCount: number;
    likeCount: number;
    username: string;
    createdTime: number[];
    modifiedTime: number[];
    memberWritten: boolean;
}

export interface IExistingFileDto {
    id: number;
    originalFileName: string;
    saveFileName: string;
    saveFilePath: string;
}

export interface IUploadedFileDto {
    id: string;
    file: File;
}

export interface ICommentDto {
    commentId: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[];
    memberWritten: boolean;
    memberAuthority: string;
}

export interface INewCommentValues {
    comment: string;
}

export interface IPhotoAlbumDescriptionValues {
    title: string;
    bodyContent: string;
}
