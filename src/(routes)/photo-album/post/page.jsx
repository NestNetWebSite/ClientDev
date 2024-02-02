import { PhotoAlbumForm as PhotoAlbumPostForm } from './_components/PhotoAlbumForm';

// 앨범 작성 및 수정 페이지
export default function Page({ isModifying }) {
    return (
        <main className='w-full'>
            <PhotoAlbumPostForm isModifying={isModifying} />;
        </main>
    );
}
