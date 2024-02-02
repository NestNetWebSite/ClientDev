import { useNavigate } from 'react-router-dom';

interface Props {
    content: string;
    href: string;
}

export default function BoardAddButton({ content, href }: Props) {
    const navigate = useNavigate();
    return (
        <button
            className={
                'rounded-xl border border-rose-800 bg-rose-800 px-3 py-2.5 text-white transition-all hover:bg-rose-900'
            }
            onClick={() => {
                navigate(href);
            }}
        >
            {content}
        </button>
    );
}
