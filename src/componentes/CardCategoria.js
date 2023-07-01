import React from 'react'
import Card from 'react-bootstrap/Card';
import numeral from 'numeral';

const CardCategoria = ({imagen, precio, nombre, onClick}) => {
    
    return(
        <div onClick={onClick}>
            <Card className='cardCategoria' >
                <div className="d-flex align-items-center justify-content-center">
                    <img alt="" style={{ width: '50%', height: 'auto' }} src={imagen} />
                </div>
                <hr/>
                <div className='d-flex justify-content-center align-items-center'>
                <p className='precio'>${numeral(precio).format('0,0.00')}</p>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                <p className='nombreCat'>{nombre}</p>
                </div>
            </Card>
        </div>
    )
}
export default CardCategoria