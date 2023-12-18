import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/member/Login';

import Error from './pages/Error';
import Tryon from './pages/products/Tryon';
import MainLayout from "./layouts/MainLayout";
import CompanyRegister from "./pages/member/CompanyRegister";
import SelectRegister from "./pages/member/SelectRegister";
import ForgotInfo from "./pages/member/ForgotInfo";
import CompanyLogin from "./pages/member/CompanyLogin";
import ForgotPassword from "./pages/member/ForgotPassword";
import Mypage from "./components/common/Mypage";
import DressList from "./components/common/DressList";



function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={ <Layout/> }>
          <Route index element={ <MainLayout/> }/>
          <Route path="mypage" element={ <Mypage/> }/>
          <Route path="tryon" element={ <Tryon /> }/>
          <Route path="dresslist" element={<DressList/>}/>
        </Route>
        {/*로그인*/}
        <Route path="/login" element={ <Login/> } />
        <Route path="/companylogin" element={<CompanyLogin/>} />
        {/*회원가입*/}
        <Route path="/selectregister" element={<SelectRegister/>} />
        <Route path="/companyregister" element={<CompanyRegister/>} />
        {/*아이디&비밀번호 찾기*/}
        <Route path="/forgotinfo" element={<ForgotInfo/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        {/*error*/}
        <Route path="*" element={ <Error/> }/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
