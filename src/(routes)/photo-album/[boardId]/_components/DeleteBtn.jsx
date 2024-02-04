import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

/**
 * 사진첩 단건 앨범 삭제
 * @returns
 */
export default function DeleteBtn() {
    const { postId } = useParams();

    const { mutate: deleteAlbum, isPending: isDeletingAlbum } = useDeleteAlbum();

    const handleAlbumDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteAlbum(postId);
        }
    };

    return (
        <div className='text-red-600'>
            <Button
                onClick={handleAlbumDelete}
                content={<MdDelete className='mt-[0.2rem] text-3xl' />}
                disabled={isDeletingAlbum ? true : false}
            />
        </div>
    );
}

// REST: 앨범 삭제
const useDeleteAlbum = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async postId => {
            const albumDeletionURL = `/api/post/delete?postId=${postId}`;

            return await axios.delete(albumDeletionURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['album']);
            navigate('/gallery');
        },
        onError: () => {
            alert('앨범 삭제에 실패했습니다.');
        },
    });
};
