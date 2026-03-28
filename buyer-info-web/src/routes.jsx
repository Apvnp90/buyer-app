import { createBrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import BuyerInfoDetails from './components/BuyerInfoDetails';
import ListBuyerInformation from './components/ListBuyerInformation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/add-buyer',
    element: <BuyerInfoDetails />,
  },
  {
    path: '/buyer-list',
    element: <ListBuyerInformation />,
  },
]);

export default router;
