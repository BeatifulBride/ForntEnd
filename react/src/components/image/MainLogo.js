import logo from '../../image/logo.png';

function MainLogo({ onClick }) {
    return (
        <div>
            <img src={logo} width='30%' height={100} onClick={onClick}/>
        </div>
    );
}

export default MainLogo;