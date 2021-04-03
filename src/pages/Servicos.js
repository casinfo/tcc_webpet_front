import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import MenuAdmin from "../pages/MenuAdmin";
import { Button, ButtonGroup } from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export default function Servicos() {
    const classes = useStyles();

    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        async function carregarServicos() {
            const response = await api.get("/servicos");

            setServicos(response.data);
        }
        carregarServicos();
    }, []);

    async function deletarServicos(id) {
        if (window.confirm("Confirma a exclusão desse serviço?")) {
            var result = await api.delete("/servicos/" + id);

            if (result.status === 200) {
                window.location.href = "/Servicos";
            } else {
                alert(
                    "Ocorreu um erro na exclusão do Serviço. Tente novamente!"
                );
            }
        }
    }

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Serviços"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table 
                             size={"small"} 
                            >
                                <TableHead>
                                    <TableRow key={servicos.id}>
                                        <TableCell>Código Serviço</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Tempo Médio</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {servicos.map((servicos) => (
                                        <TableRow key={servicos.id}>
                                            <TableCell>{servicos.id}</TableCell>
                                            <TableCell>
                                                {servicos.descricao}
                                            </TableCell>
                                            <TableCell>
                                                {servicos.tempo_medio}
                                            </TableCell>
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <Button
                                                    color="primary"
                                                    href={
                                                        "./Servicos/ServicosEditar/" + servicos.id
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={() =>
                                                        deletarServicos(
                                                            servicos.id
                                                        )
                                                    }
                                                >
                                                    Deletar
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
                                    href={"./Servicos/ServicosCadastrar"}
                                >
                                    Novo
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
