import { ClipLoader } from 'react-spinners';

interface Props {
    size: number;
}

export default function LoadingSpinner({ size }: Props) {
    return (
        <div className={'flex w-full items-center justify-center'}>
            <ClipLoader size={size} color={'#be123c'} />
        </div>
    );
}
