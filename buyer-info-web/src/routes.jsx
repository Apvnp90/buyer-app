import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import BuyerInfoDetails from './components/BuyerInfoDetails';
import ListBuyerInformation from './components/ListBuyerInformation';
import LetsTry from './components/LetsTry';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/add-buyer',
    element: (
      <ProtectedRoute>
        <BuyerInfoDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/buyer-list',
    element: (
      <ProtectedRoute>
        <ListBuyerInformation />
      </ProtectedRoute>
    ),
  },
  {
    path: '/letstry',
    element: (
      <ProtectedRoute>
        <LetsTry />
      </ProtectedRoute>
    ),
  },
]);

export default router;
