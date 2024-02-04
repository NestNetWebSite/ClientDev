export default function Dot({ active, idx, setSlideIdx }) {
    const moveDot = index => {
        setSlideIdx(index);
    };

    return (
        <div
            onClick={() => moveDot(idx)}
            className={`m-2 h-2 w-2 cursor-pointer rounded-full shadow-sm ${active ? 'bg-primary' : 'bg-gray-100'}`}
        />
    );
}
