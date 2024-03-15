import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface IProps {
    moveSlide: () => void;
    direction: string;
}
export default function SliderArrowBtn({ moveSlide, direction }: IProps) {
    return (
        <>
            <button onClick={moveSlide}>
                {direction === 'next' ? (
                    <IoIosArrowForward className='text-3xl text-secondary' />
                ) : (
                    <IoIosArrowBack className='text-3xl text-secondary' />
                )}
            </button>
        </>
    );
}
