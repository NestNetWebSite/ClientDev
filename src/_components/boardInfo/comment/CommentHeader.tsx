import getAvatarStyle from '../../../_utils/getAvatarStyle';

interface Props {
    commentId: number;
    memberLoginId: string;
    memberAuthority: string;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
    onCommentModifyTextClick: () => void;
    onCommentDeleteTextClick: (id: number) => void;
    onCommentAvatarClick: (memberId: string) => void;
}

export default function CommentHeader({
    commentId,
    memberLoginId,
    memberAuthority,
    username,
    createdTime,
    modifiedTime,
    memberWritten,
    onCommentModifyTextClick,
    onCommentDeleteTextClick,
    onCommentAvatarClick,
}: Props) {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <div
                    className={
                        'mr-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-1 text-center text-sm'
                    }
                    style={getAvatarStyle(memberAuthority)}
                    onClick={() => {
                        onCommentAvatarClick(memberLoginId);
                    }}
                >
                    {username.slice(0, 3)}
                </div>
                <div className='flex flex-col gap-y-0.5'>
                    <span className='text-[0.9rem] font-bold'>{username}</span>
                    <div className='flex items-center gap-x-5'>
                        <span className='text-[0.8rem] text-gray-500'>{`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}</span>
                        {modifiedTime !== null && (
                            <span className='text-[0.8rem] text-gray-500'>
                                수정한 날짜 : {`${modifiedTime[0]}년 ${modifiedTime[1]}월 ${modifiedTime[2]}일`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div>
                {memberWritten && (
                    <span>
                        <span
                            className='mx-1 cursor-pointer text-sm text-gray-400 duration-300 hover:text-gray-800'
                            onClick={onCommentModifyTextClick}
                        >
                            수정
                        </span>
                        <span
                            className='mx-1 cursor-pointer text-sm text-gray-400 duration-300 hover:text-gray-800'
                            onClick={() => {
                                onCommentDeleteTextClick(commentId);
                            }}
                        >
                            삭제
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
}
