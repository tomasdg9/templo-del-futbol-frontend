import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

const BotonComprar = ({onClick}) => (
  <div>
    <Button animated='vertical' onClick={onClick}>
      <Button.Content hidden>Comprar</Button.Content>
      <Button.Content visible>
        <Icon name='shop' />
      </Button.Content>
    </Button>
  </div>
)

export default BotonComprar
