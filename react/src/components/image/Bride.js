import bride from '../../image/bride.png';

function Bride ({ onClick }) {
    return (
        <div>
            <img src={bride} width='150%' height={50} onClick={onClick}/>
        </div>
    );
}

export default Bride;