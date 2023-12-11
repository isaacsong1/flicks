import App from './App';
import Authentication from './pages/authentication';
import Error404 from './pages/error404';
import AllMedia from './pages/AllMedia';

// What routing will look like:
// Upon directing to flicks => All movie directory (with option to select shows)
// If time persists => Have an actual home page: Mock tutorial on web app

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error404 />,
        children: [
            // {
            //   path: '/',
            //   index: true,
            //   element: <HomePage />,
            // },
            {
                path: '/',
                element: <AllMedia />
            },
            // {
            //     path: '/discover',
            //     // element: <AllMedia />
            // },
            // {
            //     path: '/connect',
            //     // element: <AllMedia />
            // },
            // {
            //     path: '/users/:id/mycollection',
            //     // element: <AllMedia />
            // },
            // {
            //     path: '/users/:id/profile',
            //     // element: <AllMedia />
            // },
            
        ],
    },
];

export default routes;
