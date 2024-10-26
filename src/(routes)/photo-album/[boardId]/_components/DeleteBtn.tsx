// COMPONENT: 사진 게시판 게시물 단건 삭제 버튼
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { PAGE_ROUTE } from '../../../../_constants/constants';

export default function DeleteBtn() {
    const { boardId } = useParams();

    const { mutate: deleteAlbum, isPending: isDeletingAlbum } = useDeleteAlbum();

    const handleAlbumDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteAlbum(boardId);
        }
    };

    return (
        <div className='text-red-600'>
            <Button
                onClick={handleAlbumDelete}
                content={<MdDelete className='mt-[0.2rem] text-3xl' />}
                disabled={isDeletingAlbum}
            />
        </div>
    );
}

// REST: 앨범 삭제
const useDeleteAlbum = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (boardId: string) => {
            const albumDeletionURL = `/api/post/delete?postId=${boardId}`;

            return await axios.delete(albumDeletionURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            navigate(`/${PAGE_ROUTE.PHOTOALBUMS}`);
        },
        onError: () => {
            alert('앨범 삭제에 실패했습니다.');
        },
    });
};
