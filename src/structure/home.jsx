import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row justify-content-center">
          <div className="col d-flex justify-content-center">
            {" "}
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://www.plotprojects.com/wp-content/uploads/2014/06/multiple-users.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Utenti Amministratori
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualizza tutti gli utenti amministratori del database dei
                  cocktail
                </Typography>
              </CardContent>
              <div style={{ textAlign: "center" }}>
                <Button size="large" variant="contained">Visualizza</Button>
              </div>
            </Card>
          </div>
          <div className="col d-flex justify-content-center">
            {" "}
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://www.buttalapasta.it/wp-content/uploads/2008/02/negroni-sbagliato.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lista dei Cocktails
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualizza, aggiungi o modifica tutti i cocktail presenti nel
                  database
                </Typography>
              </CardContent>
              <div style={{ textAlign: "center" }}>
                <Button size="large" variant="contained">Visualizza</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
