import { createBrowserRouter } from 'react-router-dom';

import {lazy} from 'react'


const Home = lazy(()=>import('../pages/home'))

const router = createBrowserRouter([
    {
        path:'/',
        name:'home',
        element:Home
    }
  ]);
  
  export default router;
 