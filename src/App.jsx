// import React from 'react';
// import Home from "./Pages/Home.jsx";
// import About from "./Pages/About.jsx";
// import Service from "./Pages/Service.jsx";
// import Product from "./Pages/Product.jsx";
// import Blog from "./Pages/Blog.jsx";
// import Contact from "./Pages/Contact.jsx";
// import SignIn from './Pages/SignIn.jsx';
// import SignUp from './Pages/SignUp.jsx';
// import { createBrowserRouter, RouterProvider} from 'react-router-dom';
// import Rootlayout from './layout/Rootlayout.jsx';



// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Rootlayout />,
//       children: [
//         {
//           index: true,
//           element: <Home/>,
//         },

//         {
//           path: "/about",
//           element: <About />,
//         },
  
//         {
//           path: "/service",
//           element: <Service />,
//         },
//         {
//           path: "/product",
//           element: <Product />,
//         },
        
       

//      ],
//          }, 
         
//           {
//           path: "/contact",
//           element: <Contact />,
//         },

//         {
//           path: "/blog",
//           element: <Blog />,
//         },

//         {
//           path: "/signin",
//           element: <SignIn />,
//         },

//         {
//           path: "/signup",
//           element: <SignUp />,
//         },
        

        
       
//   ]);
//   return <RouterProvider router={router} />;
// }

// export default App;


import React from 'react';
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Service from "./Pages/Service.jsx";
import Product from "./Pages/Product.jsx";
import Blog from "./Pages/Blog.jsx";
import Contact from "./Pages/Contact.jsx";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Rootlayout from './layout/Rootlayout.jsx';
import ScrollToTop from './components/ScrollToTop'; // Import the ScrollToTop component

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Rootlayout />
        </>
      ),
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/service",
          element: <Service />,
        },
        {
          path: "/product",
          element: <Product />,
        },
      ],
    }, 
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/blog",
      element: <Blog />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;