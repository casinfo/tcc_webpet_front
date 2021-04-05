import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

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

export default function ServicosCadastrar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [descricao, setDescricao] = useState("");
    const [tempo_medio, setTempomedio] = useState("");

    async function submitServicos() {
        const data = {
            descricao: descricao,
            tempo_medio: tempo_medio,
        };

        const response = await api.post("/servicos", data);

        if (response.status === 200) {
            window.location.href = "/Servicos";
        } else {
            alert(
                "Ocorreu um erro na inclusão do Serviço. Tente novamente! Erro: " +
                    response.status
            );
        }
    }

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Cadastrar Serviços"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    id="descricao"
                                    name="descricao"
                                    label="Descrição"
                                    fullWidth
                                    autoComplete="family-name"
                                    value={descricao}
                                    onChange={(e) =>
                                        setDescricao(e.target.value)
                                    }
                                />
                                <TextField
                                    required
                                    id="tempo_medio"
                                    name="tempo_medio"
                                    label="Tempo Médio"
                                    fullWidth
                                    autoComplete="shipping address-line1"
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
                                    onClick={submitServicos}
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
    );
}
