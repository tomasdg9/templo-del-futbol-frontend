import React from 'react'
import Card from 'react-bootstrap/Card';
import numeral from 'numeral';

const CardCategoria = ({imagen, precio, nombre, onClick}) => {
    
    return(
        <div onClick={onClick}>
            <Card className='cardCategoria' >
                <img src={imagen} />
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