import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { lightFormat } from "date-fns";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import MenuAdmin from "../pages/MenuAdmin";
import api from "../services/api";

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
        maxHeight: 440,
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export default function Pets() {
    const classes = useStyles();

    const [pets, setPets] = useState([]);

    useEffect(() => {
        async function carregarPets() {
            const response = await api.get("/pets");

            setPets(response.data);
        }
        carregarPets();
    }, []);

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Lista de Pets"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={classes.paper}>
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pet</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Espécie</TableCell>
                                    <TableCell>Raça</TableCell>
                                    <TableCell>Data Nascto.</TableCell>
                                    <TableCell>Peso</TableCell>
                                    <TableCell>Vacinado</TableCell>
                                    <TableCell>Porte</TableCell>
                                    <TableCell>Sexo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pets.map((pets) => (
                                    <TableRow key={pets.id}>
                                        <TableCell>{pets.id}</TableCell>
                                        <TableCell>{pets.nome}</TableCell>
                                        <TableCell>{pets.id_cliente}</TableCell>
                                        <TableCell>{pets.especie}</TableCell>
                                        <TableCell>{pets.raca}</TableCell>
                                        <TableCell>
                                            {lightFormat(
                                                new Date(pets.data_nascto),
                                                "dd/MM/yyyy"
                                            )}
                                        </TableCell>
                                        <TableCell>{pets.peso} Kg</TableCell>
                                        <TableCell>
                                            {pets.vacinado === "S"
                                                ? "Sim"
                                                : "Não"}
                                        </TableCell>
                                        <TableCell>{pets.porte}</TableCell>
                                        <TableCell>
                                            {pets.sexo === "M"
                                                ? "Macho"
                                                : "Fêmea"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                href="/Home"
                            >
                                Voltar
                            </Button>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}
