import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner() {
    return (
        <div className={'flex h-[calc(100dvh-4.68rem)] w-full items-center justify-center'}>
            <ClipLoader size={70} color={'#be123c'} />
        </div>
    );
}
