import { useNavigate, useParams } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';

/**
 * 앨범 수정 버튼
 * @param {boolean} existingData
 * @returns
 */
export default function ModifyBtn({ existingData }) {
    const { boardId } = useParams();
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(`/photo-albums/modify/${boardId}`, { state: existingData })}
            content={<RiPencilFill className='mt-1 text-3xl' />}
        />
    );
}
