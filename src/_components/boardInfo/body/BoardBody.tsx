import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

export default function BoardBody({ bodyContent }: { bodyContent: string }) {
    const safeHtmlString = DOMPurify.sanitize(bodyContent);
    return (
        <main className={'flex flex-col'}>
            <article
                className={'prose mb-32 mt-4 max-w-full p-1'}
                dangerouslySetInnerHTML={{ __html: safeHtmlString }}
            />
        </main>
    );
}
