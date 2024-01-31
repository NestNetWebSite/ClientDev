import { memo } from 'react';
import Comment from './Comment';

/**
 * 댓글창(앨범의 메타데이터 포함)
 * @param {boolean, boolean, Object, Object}
 * @returns
 */
export default memo(function PhotoAlbumMetadata({ isAlbumLoading, isMetadataVisible, postMetaData, comments }) {
    if (isMetadataVisible) {
        return (
            <>
                <div className='flex w-full flex-col bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
                    {isAlbumLoading ? (
                        <div>{/* 로딩 스피너 */}</div>
                    ) : (
                        <>
                            <div className='border-border-primary flex h-[5rem] w-full flex-row border-y p-6 px-8'>
                                <div className='BodyContent text-md my-auto font-semibold'>
                                    {postMetaData.bodyContent}
                                </div>
                            </div>
                            <h2 className='text-md px-8 py-5'>
                                댓글
                                <span className='ml-2'>{comments.length}</span>
                            </h2>
                            <ul className='Comments max-h-96 w-full overflow-auto px-12 py-4'>
                                <>
                                    {comments.length ? (
                                        comments.map(comment => {
                                            return (
                                                <Comment
                                                    key={comment.id}
                                                    comment={comment}
                                                    isAlbumLoading={isAlbumLoading}
                                                />
                                            );
                                        })
                                    ) : (
                                        <p className='text-base text-gray-600'>
                                            아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.
                                        </p>
                                    )}
                                </>
                            </ul>
                        </>
                    )}
                </div>
            </>
        );
    }
});
