import React, { PureComponent } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

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

function preventDefault(event) {
    event.preventDefault();
}

const data = [
    {
        name: "Ago",
        qtd: 35,
        amt: 346,
    },
    {
        name: "Set",
        qtd: 5,
        amt: 346,
    },
    {
        name: "Out",
        qtd: 48,
        amt: 346,
    },
    {
        name: "Nov",
        qtd: 57,
        amt: 346,
    },
    {
        name: "Dez",
        qtd: 73,
        amt: 346,
    },
    {
        name: "Jan",
        qtd: 105,
        amt: 346,
    },
];

export default function ChartPets() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Pets Últimos 6 Meses</Title>
            <div>
                <BarChart
                    width={270}
                    height={150}
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: -30,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="qtd" fill="#8884d8" />
                </BarChart>
            </div>
        </React.Fragment>
    );
}
