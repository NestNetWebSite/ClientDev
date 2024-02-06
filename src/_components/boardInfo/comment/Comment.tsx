import { useCallback, useState } from 'react';
import CommentHeader from './CommentHeader';
import CommentModifyForm from './CommentModifyForm';

interface CommentData {
    commentId: number;
    memberLoginId: string;
    memberAuthority: string;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
    onCommentAvatarClick: (memberId: string) => void;
}

type Props = CommentData & {
    onCommentDeleteTextClick(id: number): void;
    modifyComment(id: number, newContent: string): void;
};

export default function Comment({
    commentId,
    memberLoginId,
    memberAuthority,
    username,
    content,
    createdTime,
    modifiedTime,
    memberWritten,
    onCommentDeleteTextClick,
    onCommentAvatarClick,
    modifyComment,
}: Props) {
    const [isCommentModifyFormOpen, setIsCommentModifyFormOpen] = useState<boolean>(false);

    const handleCommentModifyTextClick = useCallback(() => {
        setIsCommentModifyFormOpen(prevState => !prevState);
    }, []);

    const closeCommentModifyForm = useCallback(() => {
        setIsCommentModifyFormOpen(false);
    }, []);

    return (
        <li className='my-7 flex flex-col'>
            <CommentHeader
                commentId={commentId}
                memberLoginId={memberLoginId}
                memberAuthority={memberAuthority}
                username={username}
                content={content}
                createdTime={createdTime}
                modifiedTime={modifiedTime}
                memberWritten={memberWritten}
                onCommentAvatarClick={onCommentAvatarClick}
                onCommentModifyTextClick={handleCommentModifyTextClick}
                onCommentDeleteTextClick={onCommentDeleteTextClick}
            />
            {isCommentModifyFormOpen ? (
                <CommentModifyForm
                    commentId={commentId}
                    currentCommentContent={content}
                    closeCommentModifyForm={closeCommentModifyForm}
                    modifyComment={modifyComment}
                />
            ) : (
                <p className='mx-1 my-7'>{content}</p>
            )}
        </li>
    );
}
