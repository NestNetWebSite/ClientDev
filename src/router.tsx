import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from './(routes)/publicLayout.tsx';

import GlobalNavbar from './_components/globalNavBar/GlobarNavbar.tsx';

//@ts-ignore
import MainHome from './(routes)/home/page.jsx';

import AccountLayout from './(routes)/(account)/layout.tsx';
import SignInPage from './(routes)/(account)/signin/page.tsx';
import SignUpPage from './(routes)/(account)/signup/page.tsx';

import HistoryPage from './(routes)/(introduction)/history/page.tsx';
import ProfessorPage from './(routes)/(introduction)/professor/page.tsx';
import RegulationsPage from './(routes)/(introduction)/regulations/page.tsx';

import SearchAccountLayout from './(routes)/(searchAccount)/layout.tsx';
import SearchIdPage from './(routes)/(searchAccount)/search_id/page.tsx';
import SearchPasswordPage from './(routes)/(searchAccount)/search_pw/page.tsx';

import UnifiedBoardListPage from './(routes)/community/page.tsx';
import UnifiedBoardPage from './(routes)/community/[boardId]/page.tsx';
import UnifiedBoardPostPage from './(routes)/community/post/page.tsx';
import UnifiedBoardModifyPage from './(routes)/community/modify/page.tsx';

import ExamBoardListPage from './(routes)/exam/page.tsx';
import ExamBoardPage from './(routes)/exam/[boardId]/page.tsx';
import ExamBoardPostPage from './(routes)/exam/post/page.tsx';
import ExamBoardModifyPage from './(routes)/exam/modify/page.tsx';

// @ts-ignore
import PhotoAlbumListPage from './(routes)/photo-album/page.jsx';

// @ts-ignore
import PhotoAlbumPage from './(routes)/photo-album/[boardId]/page.jsx';

// @ts-ignore
import PhotoAlbumPostPage from './(routes)/photo-album/post/page.jsx';

import NoticeBoardListPage from './(routes)/notice/page.tsx';
import NoticeBoardPage from './(routes)/notice/[boardId]/page.tsx';
import NoticeBoardPostPage from './(routes)/notice/post/page.tsx';
import NoticeBoardModifyPage from './(routes)/notice/modify/page.tsx';

import AboutMeBoardListPage from './(routes)/about_me/page.tsx';
import AboutMeBoardPage from './(routes)/about_me/[boardId]/page.tsx';
import AboutMeBoardPostPage from './(routes)/about_me/post/page.tsx';
import AboutMeBoardModifyPage from './(routes)/about_me/modify/page.tsx';

import UserLayout from './(routes)/user/layout.tsx';
import UserActivityPage from './(routes)/user/activity/page.tsx';

import NotFoundErrorPage from './(routes)/_errors/_components/NotFoundErrorPage.tsx';
import PrivateLayout from './(routes)/privateLayout.tsx';

const router = createBrowserRouter([
    {
        errorElement: (
            <>
                <GlobalNavbar />
                <NotFoundErrorPage />
            </>
        ),
        children: [
            {
                element: <PublicLayout />,
                children: [
                    {
                        path: '/',
                        element: <MainHome />,
                    },
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
                        path: '/history',
                        element: <HistoryPage />,
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
                        path: '/photo-album',
                        element: <PhotoAlbumListPage />,
                    },
                    {
                        path: '/photo-album/:boardId',
                        element: <PhotoAlbumPage />,
                    },
                    {
                        path: '/photo-album/post',
                        element: <PhotoAlbumPostPage />,
                    },
                    {
                        path: '/community',
                        element: <UnifiedBoardListPage />,
                    },
                    {
                        path: '/community/:boardId',
                        element: <UnifiedBoardPage />,
                    },
                    {
                        path: '/community/post',
                        element: <UnifiedBoardPostPage />,
                    },
                    {
                        path: '/community/modify/:boardId',
                        element: <UnifiedBoardModifyPage />,
                    },
                    {
                        path: '/exam',
                        element: <ExamBoardListPage />,
                    },
                    {
                        path: '/exam/:boardId',
                        element: <ExamBoardPage />,
                    },
                    {
                        path: '/exam/post',
                        element: <ExamBoardPostPage />,
                    },
                    {
                        path: '/exam/modify/:boardId',
                        element: <ExamBoardModifyPage />,
                    },
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
                    {
                        element: <UserLayout />,
                        children: [
                            { path: '/user/:userId?', element: <UserActivityPage /> },
                            { path: '/user/:userId?/activity', element: <UserActivityPage /> },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
