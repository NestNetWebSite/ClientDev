import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

export default function SliderArrowBtn({ moveSlide, direction }) {
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
