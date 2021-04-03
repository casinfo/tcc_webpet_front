import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup } from "@material-ui/core";
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

export default function Agenda() {
    const classes = useStyles();
    const [agenda, setAgenda] = useState([]);

    useEffect(() => {
        async function carregarAgenda() {
            const response = await api.get("/agenda");

            setAgenda(response.data);
        }
        carregarAgenda();
    }, []);

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Agenda"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table size={"small"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Hora</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Pet</TableCell>
                                        <TableCell>Funcionário</TableCell>
                                        <TableCell>Confirmado</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {agenda.map((agenda) => (
                                        <TableRow key={agenda.id_cliente}>
                                            <TableCell>
                                                {lightFormat(
                                                    new Date(agenda.data),
                                                    "dd/MM/yyyy"
                                                )}
                                            </TableCell>
                                            <TableCell>{agenda.hora}</TableCell>
                                            <TableCell>
                                                {agenda.id_cliente}
                                            </TableCell>
                                            <TableCell>
                                                {agenda.id_pet}
                                            </TableCell>
                                            <TableCell>
                                                {agenda.id_usuario}
                                            </TableCell>
                                            <TableCell>
                                                {agenda.confirmado}
                                            </TableCell>
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <Button
                                                    color="primary"
                                                    href={
                                                        "./agenda/AgendaConfirmar"
                                                    }
                                                >
                                                    Confirmar
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    href={
                                                        "./agenda/AgendaCancelar"
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                            </ButtonGroup>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={"./agenda/AgendaCadastrar"}
                                >
                                    Agendar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="/Home"
                                >
                                    Voltar
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
