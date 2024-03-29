import { useNavigate, useParams } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';

export default function ModifyBtn() {
    const { boardId } = useParams();
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(`/photo-album/modify/${boardId}`)}
            content={<RiPencilFill className='mt-1 text-3xl' />}
        />
    );
}
