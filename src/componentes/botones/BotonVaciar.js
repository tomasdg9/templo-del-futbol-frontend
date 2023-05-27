import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

const BotonVaciar = ({onClick}) => (
  <div>
    <Button animated='vertical'  onClick={onClick}>
      <Button.Content visible>Vaciar Carrito</Button.Content>
      <Button.Content hidden>
        <Icon name='trash' />
      </Button.Content>
    </Button>
  </div>
)

export default BotonVaciar