import React, { PureComponent } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

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
    { name: "Sem 1", qtd: 49 },
    { name: "Sem 2", qtd: 68 },
    { name: "Sem 3", qtd: 51 },
    { name: "Sem 4", qtd: 60 },
    { name: "Sem 5", qtd: 56 },
];

export default function ChartAgendados() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Agendamento no Mês</Title>
            <div>
                <LineChart
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
                    <Line
                        connectNulls
                        type="monotone"
                        dataKey="qtd"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                </LineChart>
            </div>
        </React.Fragment>
    );
}
