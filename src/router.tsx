import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from './(routes)/publicLayout.tsx';

import AccountLayout from './(routes)/(account)/layout.tsx';
import SignInPage from './(routes)/(account)/signin/page.tsx';
import SignUpPage from './(routes)/(account)/signup/page.tsx';

import ProfessorPage from './(routes)/(introduction)/professor/page.tsx';
import RegulationsPage from './(routes)/(introduction)/regulations/page.tsx';

import SearchAccountLayout from './(routes)/(searchAccount)/layout.tsx';
import SearchIdPage from './(routes)/(searchAccount)/search_id/page.tsx';
import SearchPasswordPage from './(routes)/(searchAccount)/search_pw/page.tsx';

// @ts-ignore
import PhotoAlbumPage from './(routes)/photo-album/page.jsx';
import PhotoAlbumPostPage from './(routes)/photo-album/post/page.jsx';

import NoticeBoardListPage from './(routes)/notice/page.tsx';
import NoticeBoardPage from './(routes)/notice/[boardId]/page.tsx';
import NoticeBoardPostPage from './(routes)/notice/post/page.tsx';
import NoticeBoardModifyPage from './(routes)/notice/modify/page.tsx';

import AboutMeBoardListPage from './(routes)/about_me/page.tsx';
import AboutMeBoardPage from './(routes)/about_me/[boardId]/page.tsx';
import AboutMeBoardPostPage from './(routes)/about_me/post/page.tsx';
import AboutMeBoardModifyPage from './(routes)/about_me/modify/page.tsx';

import NotFoundErrorPage from './(routes)/_errors/_components/NotFoundErrorPage.tsx';
import PrivateLayout from './(routes)/privateLayout.tsx';

const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        errorElement: <NotFoundErrorPage />,
        children: [
            {
                element: <AccountLayout />,
                children: [
                    { path: '/signin', element: <SignInPage /> },
                    { path: '/signup', element: <SignUpPage /> },
                ],
            },
            {
                element: <SearchAccountLayout />,
                children: [
                    { path: '/search_id', element: <SearchIdPage /> },
                    { path: '/search_pw', element: <SearchPasswordPage /> },
                ],
            },
            {
                path: '/professor',
                element: <ProfessorPage />,
            },
            {
                path: '/regulations',
                element: <RegulationsPage />,
            },
        ],
    },
    {
        element: <PrivateLayout />,
        children: [
            {
                path: '/notice',
                element: <NoticeBoardListPage />,
            },
            {
                path: '/notice/:boardId',
                element: <NoticeBoardPage />,
            },
            {
                path: '/notice/post',
                element: <NoticeBoardPostPage />,
            },
            {
                path: '/notice/modify/:boardId',
                element: <NoticeBoardModifyPage />,
            },
            {
                path: '/photo_albums',
                element: <PhotoAlbumPage />,
            },
            {
                path: '/photo_albums/post',
                element: <PhotoAlbumPostPage />,
            },
            {
                path: '/about_me',
                element: <AboutMeBoardListPage />,
            },
            {
                path: '/about_me/:boardId',
                element: <AboutMeBoardPage />,
            },
            {
                path: '/about_me/post',
                element: <AboutMeBoardPostPage />,
            },
            {
                path: '/about_me/modify/:boardId',
                element: <AboutMeBoardModifyPage />,
            },
        ],
    },
]);

export default router;
