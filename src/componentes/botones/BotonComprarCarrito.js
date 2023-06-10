import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

const BotonComprarCarrito = ({onClick}) => (
  <div>
    <Button animated='vertical' onClick={onClick}>
      <Button.Content visible>Comprar carrito</Button.Content>
      <Button.Content hidden>
        <Icon name='shop' />
      </Button.Content>
    </Button>
  </div>
)

export default BotonComprarCarrito