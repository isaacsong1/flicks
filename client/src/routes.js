import App from "./App";
import Authentication from "./pages/authentication";
import Error404 from "./pages/error404";

// What routing will look like:
// Upon directing to flicks => All movie directory (with option to select shows)
// If time persists => Have an actual home page: Mock tutorial on web app

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            // {
            //   path: "/",
            //   index: true,
            //   element: <HomePage />,
            // },
            {
                path: "/",
                element: <Authentication />
            },

        ],
    },
];

export default routes;
