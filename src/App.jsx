// App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/dashboard/contexts/AuthContext';

// Public Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Service from './Pages/Service';
import Product from './Pages/Product';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ResetPassword from './Pages/ResetPassword';

// Dashboard
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './components/dashboard/components/Dashboard';
import UserManagement from './components/dashboard/admin/UserManagement';
import ProductManagement from './components/dashboard/admin/ProductManagement';
import EducationManagement from './components/dashboard/admin/EducationManagement';
import ReviewManagement from './components/dashboard/admin/ReviewManagement';

import Rootlayout from './layout/Rootlayout';
import ScrollToTop from './components/ScrollToTop';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';
import FarmerDashboard from './components/dashboard/farmer/FarmerDashboard';
import FarmerProductManagement from './components/dashboard/farmer/FarmerProductManagement';
import UserDashboard from './components/dashboard/user/UserDashboard';
import UserProductView from './components/dashboard/user/UserProductView ';
import UserReviewManagement from './components/dashboard/user/UserReviewManagement';
import UserEducationView from './components/dashboard/user/UserEducationView ';
import FarmerEducationManagement from './components/dashboard/farmer/FarmerEducationManagement';
import DashboardRedirect from './components/dashboard/DashboardRedirects';
import FarmerReviews from './components/dashboard/farmer/FarmerReviews';
import UserOrderTracking from './components/dashboard/user/UserOrderTracking';
import { CartProvider } from './components/dashboard/contexts/CartContext';



const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Rootlayout />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'service', element: <Service /> },
      { path: 'product', element: <Product /> },
      
    ],
  },
{ path: 'blog', element: <Blog /> },
{ path: 'contact', element: <Contact /> },
{ path: 'signin', element: <SignIn /> },
{ path: 'signup', element: <SignUp /> },
{ path: "/reset-password/:token", element: <ResetPassword />},
{ path: '*', element: <h2 style={{ textAlign: 'center', marginTop: '100px', fontSize: '30px' }}>404 - Page Not Found</h2> },



{
  path: '/dashboard',
  element: <DashboardLayout />,
  children: [
    { index: true, element: <DashboardRedirect /> }, 

    // ADMIN ROUTES
    { path: 'admin', element: <AdminDashboard /> },
    { path: 'admin/users', element: <UserManagement /> },
    { path: 'admin/products', element: <ProductManagement /> },
    { path: 'admin/education', element: <EducationManagement /> },
    { path: 'admin/reviews', element: <ReviewManagement /> },

    // FARMER ROUTES
    { path: 'farmer', element: <FarmerDashboard /> },
    { path: 'farmer/products', element: <FarmerProductManagement /> },
    { path: 'farmer/education', element: <FarmerEducationManagement /> },
    { path: 'farmer/reviews', element: <FarmerReviews /> },

    // USER ROUTES
    { path: 'buyer', element: <UserDashboard /> },
    { path: 'buyer/products', element: <UserProductView /> },
    { path: 'buyer/education', element: <UserEducationView /> },
    { path: 'buyer/reviews', element: <UserReviewManagement /> },
    { path: 'buyer/order-tracking', element: <UserOrderTracking /> },
  ],
}


]);

const App = () => {
  return (
   <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
