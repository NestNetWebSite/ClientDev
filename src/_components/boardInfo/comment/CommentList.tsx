import axios from 'axios';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';

interface CommentData {
    id: number;
    username: string;
    content: string;
    createdTime: number[];
    modifiedTime: number[] | null;
    memberWritten: boolean;
}

interface Props {
    comments: CommentData[];
}

export default function CommentList({ comments }: Props) {
    const queryClient = useQueryClient();
    const { mutate: commentDeleteMutate } = useMutation({
        mutationFn(id: number) {
            return axios.delete(`/api/comment/delete/${id}`);
        },

        onSuccess(): void {
            queryClient.invalidateQueries({ queryKey: ['board'] }).catch(error => window.alert(error));
        },

        onError(error): void {
            window.alert(error);
        },
    });

    const { mutate: commentModifyMutate } = useMutation({
        mutationFn({ id, newContent }: { id: number; newContent: string }) {
            return axios.post(`/api/comment/modify/${id}`, { content: newContent }, { withCredentials: true });
        },

        onSuccess(): void {
            queryClient.invalidateQueries({ queryKey: ['board'] }).catch(error => window.alert(error));
        },

        onError(error): void {
            window.alert(error);
        },
    });

    const handleCommentDeleteTextClick = useCallback((id: number) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            commentDeleteMutate(id);
        }
    }, []);

    const modifyComment = useCallback((id: number, newContent: string) => {
        commentModifyMutate({ id, newContent });
    }, []);

    return (
        <ul className={'[&>li:not(&>li:last-child)]:border-b'}>
            {comments.map(comment => {
                return (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        username={comment.username}
                        content={comment.content}
                        createdTime={comment.createdTime}
                        modifiedTime={comment.modifiedTime}
                        memberWritten={comment.memberWritten}
                        onCommentDeleteTextClick={handleCommentDeleteTextClick}
                        modifyComment={modifyComment}
                    />
                );
            })}
        </ul>
    );
}
