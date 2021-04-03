import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import MenuAdmin from "../pages/MenuAdmin";

import QtdAgendaMes from "./dashboard/QtdAgendaMes";
import QtdAgendados from "./dashboard/QtdAgendados";
import QtdClientes from "./dashboard/QtdClientes";
import QtdPets from "./dashboard/QtdPets";
import QtdServicos from "./dashboard/QtdServicos";

import ChartAgendados from "./dashboard/ChartAgendados";
import ChartClientes from "./dashboard/ChartClientes";
import ChartPets from "./dashboard/ChartPets";
import ChartAgendaMes from "./dashboard/ChartAgendaMes";
import ChartServicos from "./dashboard/ChartServicos";

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
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        textAlign: "center" ,

    },
    fixedHeight: {
        height: 110,
    },
    fixedHeightChart: {
        height: 220,
    },
    fixedWidth: {
        width: 300,
    },
    fixedWidthChart: {
        width: 300,
    },    
}));

export default function Dashboard() {

    const classes = useStyles();
    const stylePaper = clsx(classes.paper, classes.fixedHeight, classes.fixedWidth);    
    const styleChart = clsx(classes.paper, classes.fixedHeightChart, classes.fixedWidthChart);  

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Dashboard"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Clientes */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={stylePaper}>
                                <QtdClientes />
                            </Paper>
                        </Grid>
                        {/* Pets */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={stylePaper}>
                                <QtdPets />
                            </Paper>
                        </Grid>
                        {/* Qtde Serviços */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={stylePaper}>
                                <QtdServicos />
                            </Paper>
                        </Grid>
                        {/* Chart Clientes */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={styleChart}>
                                <ChartClientes />
                            </Paper>
                        </Grid>
                        {/* Chart Pets */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={styleChart}>
                                <ChartPets />
                            </Paper>
                        </Grid>
                        {/* Chart Serviços */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={styleChart}>
                                <ChartServicos />
                            </Paper>
                        </Grid>
                        {/* Agendados Semana */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={stylePaper}>
                                <QtdAgendados />
                            </Paper>
                        </Grid>
                        {/* Agendamentos Mês */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={stylePaper}>
                                <QtdAgendaMes />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                        </Grid>
                        {/* Chart Agendados Semana */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={styleChart}>
                                <ChartAgendados />
                            </Paper>
                        </Grid>
                        {/* Chart Agendamentos Mês */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={styleChart}>
                                <ChartAgendaMes />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                href="/Home"
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
