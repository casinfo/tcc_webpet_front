import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";
import api from "../../services/api";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function QtdClientes() {
    const classes = useStyles();

    const [dashClientes, setDashCliente] = useState([]);
    const [tot, setTotDashClientes] = useState([]);

    // Obtém a data/hora atual
    const data = new Date();
    //var dia = data.getDate(); // 1-31
    //var dia_sem = data.getDay(); // 0-6 (zero=domingo)
    const mes = data.getMonth(); // 0-11 (zero=janeiro)
    //var ano2 = data.getYear(); // 2 dígitos
    const ano = data.getFullYear(); // 4 dígitos

    useEffect(() => {
        async function lerDashClientes() {
            const response = await api.get("/dashclientes");

            setDashCliente(response.data);
            setTotDashClientes(response.data[0].tot);
        }

        lerDashClientes();
    }, []);

    const filtroDash = (dashClientes) =>
        dashClientes.ano === ano && dashClientes.mes === mes;
    const regDash = dashClientes.filter(filtroDash);

    console.log(regDash);

    //setTotDashClientes(regDash[0].tot);

    // const fil = [regDash][0].filter((t) => t.tot);
    // console.log("ei", regDash[0].tot);

    // setTotDashClientes(fil);

    return (
        <React.Fragment>
            <Title>Novos Clientes *</Title>
            <Typography component="p" variant="h4">
                {tot}
            </Typography>
            <Typography
                color="textSecondary"
                className={classes.depositContext}
            ></Typography>
        </React.Fragment>
    );
}
