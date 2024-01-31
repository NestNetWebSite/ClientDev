import { MdComment } from 'react-icons/md';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';

/**
 * 앨범 메타데이터 토글 버튼
 * @param {boolean}
 * @returns
 */
export default function MetadataBtn({ setIsMetadataVisible }) {
    const toggleMetadataVisibility = () => {
        setIsMetadataVisible(prev => !prev);
    };

    return (
        <div className='my-3' onClick={toggleMetadataVisibility}>
            <Button content={<MdComment className='mt-1 text-3xl' />} />
        </div>
    );
}
