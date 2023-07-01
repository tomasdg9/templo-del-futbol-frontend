import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

const BotonSiguiente = () => (
  <div>
    <Button className="blue" animated>
      <Button.Content visible>Siguiente</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
  </div>
)

export default BotonSiguiente