import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/member/Login';

import Error from './pages/Error';
import Tryon from './pages/products/Tryon';
import MainLayout from "./layouts/MainLayout";
import CompanyRegister from "./pages/member/CompanyRegister";
import SelectRegister from "./pages/member/SelectRegister";
import ForgotInfo from "./pages/member/ForgotInfo";
import ForgotPassword from "./pages/member/ForgotPassword";
import Mypage from "./components/common/Mypage";
import DressList from "./components/common/DressList";
import DressLikeList from "./pages/products/DressLikeList";
import TryonResult from "./pages/products/TryonResult";
import CompanyMypage from "./pages/company/CompanyMypage";
import CompanyDressRe from "./pages/company/CompanyDressRe";
import CompanyDressList from "./pages/company/CompanyDressList";



function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={ <Layout/> }>
          <Route index element={ <MainLayout/> }/>
          {/*마이페이지*/}
          <Route path="mypage" element={ <Mypage/> }>
            <Route index element={ <DressLikeList/>}/>
          </Route>
          {/*Tryon*/}
          <Route path="tryon" element={ <Tryon /> }/>
          <Route path="tryonresult" element={ <TryonResult />}/>
          {/*드레스리스트*/}
          <Route path="dresslist" element={<DressList/>}/>
        </Route>
        {/*로그인*/}
        <Route path="/login" element={ <Login/> } />
        {/*<Route path="/companylogin" element={<CompanyLogin/>} />*/}
        {/*회원가입*/}
        <Route path="/selectregister" element={<SelectRegister/>} />
        <Route path="/companyregister" element={<CompanyRegister/>} />
        {/*아이디&비밀번호 찾기*/}
        <Route path="/forgotinfo" element={<ForgotInfo/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        {/*error*/}
        <Route path="*" element={ <Error/> }/>

        {/*드레스 업체*/}
        <Route path="/company" element={<CompanyMypage/>} />
        {/*  드레스 등록 */}
         <Route path="/companydress" element={<CompanyDressRe/>} />
        {/* 업체 드레스 리스트 */}
        <Route path="/companylist" element={<CompanyDressList/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
