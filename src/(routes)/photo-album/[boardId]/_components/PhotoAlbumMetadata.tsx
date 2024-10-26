// COMPONENT: 사진 앨범 상세 (제목, 본문, 댓글 등)
import { memo } from 'react';
import Comment from './Comment';
import { IPhotoPostDto, ICommentDto } from '../../types';

interface IProps {
    isMetadataVisible: boolean;
    postMetaData: IPhotoPostDto;
    comments: ICommentDto[];
}
export default memo(function PhotoAlbumMetadata({ isMetadataVisible, postMetaData, comments }: IProps) {
    if (isMetadataVisible) {
        return (
            <>
                <div className='flex h-[5rem] w-full flex-row border-y px-8 py-6 pt-7'>
                    <div className='BodyContent text-md my-auto font-semibold'>{postMetaData?.bodyContent}</div>
                </div>
                <h2 className='text-md px-8 py-5 pb-2'>
                    댓글
                    <span className='ml-2'>{comments?.length}</span>
                </h2>
                <ul className='Comments max-h-96 w-full overflow-auto px-12 py-4'>
                    {comments.length ? (
                        comments.map(comment => {
                            return <Comment key={comment.commentId} comment={comment} />;
                        })
                    ) : (
                        <p className='text-base text-gray-600'>아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.</p>
                    )}
                </ul>
            </>
        );
    }
});
