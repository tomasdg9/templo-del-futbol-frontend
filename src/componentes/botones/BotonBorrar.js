import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

const BotonBorrar = () => (
  <div>
    <Button animated>
      <Button.Content visible>Borrar</Button.Content>
      <Button.Content hidden>
        <Icon name='delete' />
      </Button.Content>
    </Button>
  </div>
)

export default BotonBorrar