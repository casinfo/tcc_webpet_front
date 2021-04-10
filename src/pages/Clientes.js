import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
//import Chip from "@material-ui/core/Chip";

//import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";

import MenuAdmin from "../pages/MenuAdmin";
import { Button, ButtonGroup } from "@material-ui/core";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { lightFormat } from "date-fns";
import Title from "./Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import api from "../services/api";
import { getTipoUsuario } from "../services/auth";

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

export default function Clientes() {
    const classes = useStyles();
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [clientes, setclientes] = useState([]);
    const [pets, setPets] = useState([]);

    const tip_usuario = getTipoUsuario();

    const clientesPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "WebPet - Listagem de Clientes";
        const headers = [["CÓDIGO", "NOME", "E-MAIL", "FONE", "CPF"]];

        const data = clientes.map((clientes) => [
            clientes.id,
            clientes.nome,
            clientes.email,
            clientes.fone,
            clientes.cpf,
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
            autoSize: true,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("lista-clientes.pdf");
    };

    const petsPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(10);

        const title = "WebPet - Listagem de Pets";
        const headers = [
            [
                "CÓDIGO",
                "NOME",
                "CLIENTE",
                "ESPÉCIE",
                "RAÇA",
                "NASCTO.",
                "PESO",
                "VACINADO",
                "PORTE",
                "SEXO",
            ],
        ];

        const data = pets.map((pets) => [
            pets.id,
            pets.nome,
            pets.id_cliente,
            pets.especie,
            pets.raca,
            lightFormat(new Date(pets.data_nascto), "dd/MM/yyyy"),
            pets.peso,
            pets.vacinado,
            pets.porte,
            pets.sexo,
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("lista-pets.pdf");
    };

    useEffect(() => {
        async function carregarClientes() {
            const response = await api.get("/clientes");

            setclientes(response.data);
        }
        carregarClientes();

        async function carregarPets() {
            const response = await api.get("/pets");

            setPets(response.data);
        }
        carregarPets();
    }, []);

    async function deletarCliente(id) {
        if (window.confirm("Confirma a exclusão desse cliente?")) {
            var result = await api.delete("/clientes/" + id);

            if (result.status === 200) {
                window.location.href = "/clientes";
            } else {
                alert(
                    "Ocorreu um erro na exclusão do cliente. Tente novamente!"
                );
            }
        }
    }

    async function deletarPet(id) {
        if (window.confirm("Confirma a exclusão desse pet?")) {
            var result = await api.delete("/pets/" + id);

            if (result.status === 200) {
                window.location.href = "/clientes";
            } else {
                alert("Ocorreu um erro na exclusão do pet. Tente novamente!");
            }
        }
    }

    const filtroPets = "";
    const listarPets = pets;

    function clickCliente(id) {
        const filtroPets = (pets) => pets.id_cliente === id;
        const listarPets = pets.filter(filtroPets);

        console.log(listarPets);
    }

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Clientes"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table size={"small"}>
                                <TableHead>
                                    <TableRow key={clientes.id}>
                                        <TableCell component="th" scope="row">
                                            Código
                                        </TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>E-mail</TableCell>
                                        <TableCell>CPF</TableCell>
                                        <TableCell>Fone</TableCell>
                                        <TableCell>Opções</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientes.map((clientes) => (
                                        <TableRow
                                            key={clientes.id}
                                            hover
                                            onClick={(event) =>
                                                clickCliente(clientes.id)
                                            }
                                            role="checkbox"
                                            tabIndex={-1}
                                            //onClick={(e) => setIdParam(e)}
                                        >
                                            <TableCell>{clientes.id}</TableCell>
                                            <TableCell>
                                                {clientes.nome}
                                            </TableCell>
                                            <TableCell>
                                                {clientes.email}
                                            </TableCell>
                                            <TableCell>
                                                {clientes.cpf}
                                            </TableCell>
                                            <TableCell>
                                                {clientes.fone}
                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup aria-label="outlined primary button group">
                                                    <Button
                                                        color="primary"
                                                        href={
                                                            "./clientes/ClientesEditar/" +
                                                            clientes.id
                                                        }
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        onClick={() =>
                                                            deletarCliente(
                                                                clientes.id
                                                            )
                                                        }
                                                        disabled={
                                                            tip_usuario !== "A"
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Deletar
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={"./clientes/clientesCadastrar"}
                                >
                                    Novo
                                </Button>{" "}
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={clientesPDF}
                                    endIcon={<PictureAsPdfOutlinedIcon />}
                                >
                                    Listar
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Title>Pets</Title>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table size={"small"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Código Pet
                                        </TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Espécie</TableCell>
                                        <TableCell>Raça</TableCell>
                                        <TableCell>Sexo</TableCell>
                                        <TableCell>Porte</TableCell>
                                        <TableCell>Peso</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Opções</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listarPets.map((listarPets) => (
                                        <TableRow
                                            key={listarPets.id}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            //onFetchData={this.fetchData}
                                        >
                                            <TableCell>
                                                {listarPets.id}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.nome}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.especie}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.raca}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.sexo}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.porte}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.peso}
                                            </TableCell>
                                            <TableCell>
                                                {listarPets.id_cliente}
                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup aria-label="outlined primary button group">
                                                    <Button
                                                        color="primary"
                                                        href={
                                                            "./pets/PetsEditar/" +
                                                            listarPets.id
                                                        }
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        onClick={() =>
                                                            deletarPet(
                                                                listarPets.id
                                                            )
                                                        }
                                                        disabled={
                                                            tip_usuario !== "A"
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Deletar
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={"./pets/PetsCadastrar/"}
                                >
                                    Novo
                                </Button>
                                <Button
                                    variant="contained"
                                    color="default"
                                    onClick={petsPDF}
                                    endIcon={<PictureAsPdfOutlinedIcon />}
                                >
                                    Listar
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
