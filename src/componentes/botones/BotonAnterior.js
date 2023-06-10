import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

const BotonAnterior = () => (
  <div>
    <Button animated>
      <Button.Content visible>Anterior</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
  </div>
)

export default BotonAnterior