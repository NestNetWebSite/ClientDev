import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import useCheckUser from './_hooks/useCheckUser.ts';

export default function Root() {
    useCheckUser();

    return <RouterProvider router={router} />;
}
