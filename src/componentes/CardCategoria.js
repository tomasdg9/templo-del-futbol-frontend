import React from 'react'
import Card from 'react-bootstrap/Card';

const CardCategoria = ({imagen, precio, nombre, onClick}) => {
    
    return(
        <div onClick={onClick}>
            <Card className='cardCategoria' >
                <img src={imagen} />
                <hr/>
                <div class='d-flex justify-content-center align-items-center'>
                <text className='precio'>{precio}</text>
                </div>
                
                <div class='d-flex justify-content-center align-items-center'>
                <text className='nombreCat'>{nombre}</text>
                </div>
            </Card>
        </div>
    )
}
export default CardCategoria