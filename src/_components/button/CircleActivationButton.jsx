export function CircleActivationButton({ onClick, content, disabled = false }) {
    return (
        <>
            <button
                onClick={onClick}
                className='box-content flex h-[2.3rem] w-[2.3rem] flex-col items-center rounded-full bg-gray-200 p-2 duration-300 hover:bg-gray-300'
                disabled={disabled}
            >
                {content}
            </button>
        </>
    );
}
