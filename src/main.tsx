import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import './index.css';
import NotFound from "./pages/NotFound.tsx";
import Main from "./pages/Home.tsx";
import ArticleMain from "./pages/Article";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import Header from "./components/Header/Header.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <NotFound />,
    },
    {
        path: '/articles',
        element: <ArticleMain />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <Header />
        <RouterProvider router={router} />
        </Provider>,
);