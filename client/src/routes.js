import App from './App';
import Authentication from './features/user/Authentication';
import ErrorPage from './pages/ErrorPage';
// import AllMedia from './pages/AllMedia';
import Discover from './pages/Discover';
import Connect from './pages/Connect';
import MyCollection from './pages/MyCollection';
import Profile from './pages/Profile';

// What routing will look like:
// Upon directing to flicks => All movie directory (with option to select shows)
// If time persists => Have an actual home page: Mock tutorial on web app

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
            // {
            //     path: '/',
            //     element: <AllMedia />
            // },
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
