import App from './App';
import Authentication from './features/user/Authentication';
import ErrorPage from './pages/ErrorPage';
import Discover from './pages/Discover';
import Connect from './pages/Connect';
import MyCollection from './pages/MyCollection';
import Profile from './pages/Profile';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Authentication />
            },
            {
                path: '/discover',
                element: <Discover />,
            },
            {
                path: '/connect',
                element: <Connect />,
            },
            {
                path: '/users/:id/mycollection',
                element: <MyCollection />,
            },
            {
                path: '/users/:id/profile',
                element: <Profile />,
            },
        ],
    },
];

export default routes;
