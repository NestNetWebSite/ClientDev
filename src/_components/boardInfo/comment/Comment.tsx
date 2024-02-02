import { useCallback, useState } from 'react';
import CommentHeader from './CommentHeader';
import CommentModifyForm from './CommentModifyForm';

interface CommentData {
    id: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}

type Props = CommentData & {
    onCommentDeleteTextClick(id: number): void;
    modifyComment(id: number, newContent: string): void;
};

export default function Comment({
    id,
    username,
    content,
    createdTime,
    modifiedTime,
    memberWritten,
    onCommentDeleteTextClick,
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
                id={id}
                username={username}
                content={content}
                createdTime={createdTime}
                modifiedTime={modifiedTime}
                memberWritten={memberWritten}
                onCommentModifyTextClick={handleCommentModifyTextClick}
                onCommentDeleteTextClick={onCommentDeleteTextClick}
            />
            {isCommentModifyFormOpen ? (
                <CommentModifyForm
                    id={id}
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
