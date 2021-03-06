import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";

import MenuAdmin from "../MenuAdmin";
import api from "../../services/api";

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

export default function ServicosEditar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [descricao, setDescricao] = useState("");
    const [tempo_medio, setTempomedio] = useState("");

    const { id } = useParams();

    useEffect(() => {
        async function getServico() {
            var response = await api.get("/servicos?id=" + id);

            setDescricao(response.data[0].descricao);
            setTempomedio(response.data[0].tempo_medio);
        }
        getServico();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function submitServico() {
        const data = {
            descricao: descricao,
            tempo_medio: tempo_medio,
        };

        const response = await api.put("/servicos/" + id, data);
        if (response.status === 200) {
            window.location.href = "/Servicos";
        } else {
            alert(
                "Ocorreu um erro na alteração do Serviço. Tente novamente! Erro: " +
                    response.status
            );
        }
    }

    return (
        <div>
            <div className={classes.root}>
                <MenuAdmin title={"Editar Serviços"} />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Paper className={fixedHeightPaper}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        id="descricao"
                                        name="descricao"
                                        label="Descrição"
                                        fullWidth
                                        value={descricao}
                                        onChange={(e) =>
                                            setDescricao(e.target.value)
                                        }
                                    />
                                    <TextField
                                        id="tempo_medio"
                                        name="tempo_medio"
                                        label="Tempo Médio"
                                        fullWidth
                                        value={tempo_medio}
                                        onChange={(e) =>
                                            setTempomedio(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={submitServico}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href="/Servicos"
                                    >
                                        Voltar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </main>
            </div>
        </div>
    );
}
