import { createBrowserRouter } from 'react-router-dom';
import { PAGE_ROUTE } from '../src/_constants/constants.ts';

import PublicLayout from './(routes)/publicLayout.tsx';
import PrivateLayout from './(routes)/privateLayout.tsx';

import GlobalNavbar from './_components/globalNavBar/GlobarNavbar.tsx';

import MainHome from './(routes)/home/page.tsx';

import AccountLayout from './(routes)/(account)/layout.tsx';
import SignInPage from './(routes)/(account)/signin/page.tsx';
import SignUpPage from './(routes)/(account)/signup/page.tsx';

import HistoryPage from './(routes)/(introduction)/history/page.tsx';
import ProfessorPage from './(routes)/(introduction)/professor/page.tsx';
import RegulationsPage from './(routes)/(introduction)/regulations/page.tsx';
import ExecutivesPage from './(routes)/(introduction)/executives/page.tsx';
import FormerExecutives from './(routes)/(introduction)/former_executives/page.tsx';

import SearchAccountLayout from './(routes)/(searchAccount)/layout.tsx';
import SearchIdPage from './(routes)/(searchAccount)/search_id/page.tsx';
import SearchPasswordPage from './(routes)/(searchAccount)/search_pw/page.tsx';

import PhotoAlbumListPage from './(routes)/photo-album/page.tsx';
import PhotoAlbumPage from './(routes)/photo-album/[boardId]/page.tsx';
import PhotoAlbumPostPage from './(routes)/photo-album/post/page.tsx';
import PhotoAlbumModifyPage from './(routes)/photo-album/modify/page.tsx';

import UnifiedBoardListPage from './(routes)/community/page.tsx';
import UnifiedBoardPage from './(routes)/community/[boardId]/page.tsx';
import UnifiedBoardPostPage from './(routes)/community/post/page.tsx';
import UnifiedBoardModifyPage from './(routes)/community/modify/page.tsx';

import ExamBoardListPage from './(routes)/exam/page.tsx';
import ExamBoardPage from './(routes)/exam/[boardId]/page.tsx';
import ExamBoardPostPage from './(routes)/exam/post/page.tsx';
import ExamBoardModifyPage from './(routes)/exam/modify/page.tsx';

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

import AdminPage from './(routes)/admin/page.tsx';
import MemberManagementPage from './(routes)/admin/member_management/page.tsx';

import ExecutivesManagementPage from './(routes)/admin/executives/page.tsx';
import FormerExecutivesManagementPage from './(routes)/admin/former_executives/page.tsx';

import NotFoundErrorPage from './(routes)/_errors/_components/NotFoundErrorPage.tsx';

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
                        path: `/${PAGE_ROUTE.HISTORY}`,
                        element: <HistoryPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PROFESSOR}`,
                        element: <ProfessorPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.REGULATIONS}`,
                        element: <RegulationsPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXECUTIVES}`,
                        element: <ExecutivesPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.FORMER_EXECUTIVES}`,
                        element: <FormerExecutives />,
                    },
                ],
            },
            {
                element: <PrivateLayout />,
                children: [
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}`,
                        element: <PhotoAlbumListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}/:boardId`,
                        element: <PhotoAlbumPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}/post`,
                        element: <PhotoAlbumPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.PHOTOALBUMS}/modify/:boardId`,
                        element: <PhotoAlbumModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}`,
                        element: <UnifiedBoardListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}/:boardId`,
                        element: <UnifiedBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}/post`,
                        element: <UnifiedBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.COMMUINTY}/modify/:boardId`,
                        element: <UnifiedBoardModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXAM}`,
                        element: <ExamBoardListPage />,
                    },
                    {
                        path: `${PAGE_ROUTE.EXAM}/:boardId`,
                        element: <ExamBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXAM}/post`,
                        element: <ExamBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.EXAM}/modify/:boardId`,
                        element: <ExamBoardModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}`,
                        element: <NoticeBoardListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}/:boardId`,
                        element: <NoticeBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}/post`,
                        element: <NoticeBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.NOTICE}/modify/:boardId`,
                        element: <NoticeBoardModifyPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}`,
                        element: <AboutMeBoardListPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}/:boardId`,
                        element: <AboutMeBoardPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}/post`,
                        element: <AboutMeBoardPostPage />,
                    },
                    {
                        path: `/${PAGE_ROUTE.ABOUT_ME}/modify/:boardId`,
                        element: <AboutMeBoardModifyPage />,
                    },
                    {
                        element: <UserLayout />,
                        children: [
                            { path: '/user/:userId?', element: <UserActivityPage /> },
                            { path: '/user/:userId?/activity', element: <UserActivityPage /> },
                        ],
                    },
                    {
                        path: '/admin',
                        element: <AdminPage />,
                        children: [
                            { index: true, element: <MemberManagementPage /> },
                            { path: 'users', element: <MemberManagementPage /> },
                            { path: 'executives', element: <ExecutivesManagementPage /> },
                            { path: 'former_executives', element: <FormerExecutivesManagementPage /> },
                        ],
                    },
                ],
            },
        ],
    },
]);

export default router;
