import logo from '../../image/BB_logo.png';
import NaverCSS from '../../components/common/Navbar.module.css'

function MainLogo({ onClick }) {
    return (
        <div>
            <img src={logo} className={NaverCSS.logo} width='30%' height={100} onClick={onClick}/>
        </div>
    );
}

export default MainLogo;