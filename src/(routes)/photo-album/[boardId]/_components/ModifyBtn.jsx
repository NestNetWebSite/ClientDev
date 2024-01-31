import { useNavigate } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';

/**
 * 앨범 수정 버튼
 * @param {boolean} existingData
 * @returns
 */
export default function ModifyBtn({ existingData }) {
    const navigate = useNavigate();

    return (
        <div className='mt-3'>
            <Button
                // 앨범 수정 라우팅 설정 필요
                onClick={() => navigate(``, { state: existingData })}
                content={<RiPencilFill className='mt-1 text-3xl' />}
            />
        </div>
    );
}
