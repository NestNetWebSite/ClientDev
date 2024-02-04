import PhotoAlbumForm from '../../../_components/boardPostAndModify/PhotoAlbumForm';

// 앨범 수정 페이지
export default function Page() {
    return (
        <main className='w-full'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-10'>
                <PhotoAlbumForm isModifying={true} />
            </div>
        </main>
    );
}
