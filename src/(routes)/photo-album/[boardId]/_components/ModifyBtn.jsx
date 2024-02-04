import { useNavigate, useParams } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';

/**
 * 앨범 수정 버튼
 * @param {boolean} existingData
 * @returns
 */
export default function ModifyBtn({ existingData }) {
    const { postId } = useParams();
    const navigate = useNavigate();

    return (
        <Button
            // 앨범 수정 라우팅 설정 필요
            onClick={() => navigate(`../modify/${postId}`, { state: existingData })}
            content={<RiPencilFill className='mt-1 text-3xl' />}
        />
    );
}
