import RegisterCSS from './Register.module.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import CompanyRegister from "./CompanyRegister";
import SelectRegisterCSS from "./SelectRegister.module.css"

function SelectRegister() {
    return (
        <div className={SelectRegisterCSS.App}>
            <div className={SelectRegisterCSS.appAside}/>
            <div className={SelectRegisterCSS.appForm}>
                <div className={SelectRegisterCSS.pageSwitcher}>
                    <NavLink
                        to="/selectregister"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                        style={{color:"white"}}
                    >
                        Register(일반회원가입)
                    </NavLink>
                    <NavLink
                        to="/companyregister"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                    >
                        CompanyRegister(드레스업체 회원가입)
                    </NavLink>
                </div>

                <Routes>
                    <Route path="/" element={<Register/>}/>
                    <Route path="/companyregister" element={<CompanyRegister/>}/>
                </Routes>
            </div>
            <div className={SelectRegisterCSS.appAside2}/>
        </div>
    );
}

export default SelectRegister;
