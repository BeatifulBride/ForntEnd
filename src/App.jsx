import { Route, Routes } from "react-router-dom";
import MyDressList from "./pages/MyDressList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import UploadMyDress from "./pages/UploadMyDress";
import Main from "./pages/Main";
import UploadedMyDress from "./pages/UploadedMyDress";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my-dress-list" element={<MyDressList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-my-dress" element={<UploadMyDress />} />
        <Route path="/uploaded-my-dress" element={<UploadedMyDress />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
