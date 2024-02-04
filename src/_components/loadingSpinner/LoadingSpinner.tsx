import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner({ size }) {
    return (
        <div className={'flex w-full items-center justify-center'}>
            <ClipLoader size={size} color={'#be123c'} />
        </div>
    );
}
