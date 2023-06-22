import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import numeral from 'numeral';
import Grid from '@mui/material/Grid';


class Producto extends Component {

  render() {
  return (
    <Grid item key={this.props.id}>
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          image={this.props.imagen}
          sx={{
            objectFit: 'unset',
            objectPosition: 'unset',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <b>{this.props.nombre}</b>
          </Typography>
          <div className="col-md-6 offset-md-3 text-center">
          <Typography variant="body2" color="text.secondary">
            <b>${numeral(this.props.precio).format('0,0.00')}</b>
          </Typography>
          </div>
        </CardContent>
        <div className="col-md-6 offset-md-3 text-center">
        <div style={{ marginTop: 'auto' }}>
          <CardActions>
            <Link to={`/productos/${this.props.id}`} className="btn btn-primary btn-sm mx-2 ">Ver producto</Link>
          </CardActions>
        </div>
        </div>
      </Card>
    </Grid>
  );
  }
}
export default Producto;
