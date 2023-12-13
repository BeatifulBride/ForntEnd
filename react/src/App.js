import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import Tryon from './pages/products/Tryon';
import MainLayout from "./layouts/MainLayout";
import CompanyRegister from "./pages/member/CompanyRegister";
import SelectRegister from "./pages/member/SelectRegister";
import ForgotInfo from "./pages/member/ForgotInfo";



function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={ <Layout/> }>
          <Route index element={ <MainLayout/> }/>
          <Route path="tryon" element={ <Tryon /> }/>
        </Route>
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/companyregister" element={<CompanyRegister/>} />
        <Route path="/selectregister" element={<SelectRegister/>} />
        <Route path="/forgotpassword" element={<ForgotInfo/>} />
        <Route path="*" element={ <Error/> }/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
