import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const CategoriaNew = (props) => {
  return (
    <Grid item key={props.id}>
      <Card sx={{ maxWidth: 250 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <b>{props.nombre}</b>
          </Typography>
          {props.descripcion}
        </CardContent>
        <div className="col-md-6 offset-md-3 text-center">
        <div style={{ marginTop: 'auto' }}>
        <div className="d-flex justify-content-center mb-2">
          <CardActions>
            <Link to={`/categorias/${props.id}`} className="btn btn-primary btn-sm mx-2">Ver productos</Link>
          </CardActions>
          </div>
        </div>
        </div>
      </Card>
    </Grid>
  );
}

export default CategoriaNew;
