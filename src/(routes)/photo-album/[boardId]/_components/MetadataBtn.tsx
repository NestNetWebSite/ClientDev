import { Dispatch, SetStateAction } from 'react';
import { MdComment } from 'react-icons/md';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';

interface IProps {
    setIsMetadataVisible: Dispatch<SetStateAction<boolean>>;
}

export default function MetadataBtn({ setIsMetadataVisible }: IProps) {
    const toggleMetadataVisibility = () => {
        setIsMetadataVisible(prev => !prev);
    };

    return <Button onClick={toggleMetadataVisibility} content={<MdComment className='mt-1 text-3xl' />} />;
}
