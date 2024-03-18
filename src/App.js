import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";


import Footer from './component/utils/Footer';
import Navbar from './component/utils/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";

import AddProductPage from "./pages/AddProductPage";
import MerchantProductsPage from "./pages/MerchantProductsPage";
import EditProductPage from "./pages/EditProductPage";
import MazadChatPage from "./pages/MazadChatPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRouteHook from "./hook/auth/ProtectedRouteHook";
import ProtectedRoute from "./component/utils/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";


function App() {
  const [isUser, isAdmin, userData] = ProtectedRouteHook()
  return (
   <div>
   <BrowserRouter>
   <Navbar />
   <Routes>
   <Route path="/" element={<HomePage /> } />
   <Route path="product/:productId" element={<ProductDetailsPage /> } />
   <Route path="login" element={<LoginPage /> } />
   <Route path="register" element={<RegisterPage/>} />

   <Route element={<ProtectedRoute auth={isUser} />}>
        <Route path="mazad/:productId" element={<MazadChatPage /> } />
        <Route path="my-orders" element={<UserOrdersPage /> } />
        <Route path="order/:orderId" element={<OrderDetailsPage /> } />
        <Route path="order/payment" element={<PaymentPage /> } />
    </Route>

    <Route element={<ProtectedRoute auth={isAdmin} />}>
      <Route path="add-product" element={<AddProductPage /> } />
      <Route path="merchant-product" element={<MerchantProductsPage /> } />
      <Route path="edit-product/:productId" element={<EditProductPage /> } />

    </Route>

 
   
   </Routes>
   <Footer />
   </BrowserRouter>
  
   
   
   </div>
  );
}

export default App;
