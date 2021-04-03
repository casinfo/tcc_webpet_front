import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import MenuAdmin from "../MenuAdmin";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export default function PetCadastrar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Pets"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="id_cliente"
                                name="id_cliente"
                                label="Código"
                                fullWidth
                                disabled
                                autoComplete="given-name"
                            />
                            <TextField
                                id="id_pet"
                                name="id_pet"
                                label="Código Pet"
                                fullWidth
                                disabled
                                autoComplete="given-name"
                            />
                            <TextField
                                required
                                id="nome"
                                name="nome"
                                label="Nome"
                                fullWidth
                                autoComplete="family-name"
                            />
                            <TextField
                                required
                                id="especie"
                                name="especie"
                                label="Espécie"
                                fullWidth
                            />
                            <TextField
                                id="raca"
                                name="raca"
                                label="Raça"
                                fullWidth
                            />
                            <TextField
                                id="data_nascto"
                                name="data_nascto"
                                label="Data Nascimento"
                                fullWidth
                            />
                            <TextField
                                id="peso"
                                name="peso"
                                label="Peso"
                                fullWidth
                            />
                            <TextField
                                id="vacinado"
                                name="vacinado"
                                label="Vacinado"
                                fullWidth
                            />
                            <TextField
                                id="porte"
                                name="porte"
                                label="Porte"
                                fullWidth
                            />
                            <TextField
                                id="sexo"
                                name="sexo"
                                label="Sexo"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary">
                                Salvar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                href="/Clientes"
                            >
                                Voltar
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
