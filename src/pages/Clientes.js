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
    const [selected, setSelected] = React.useState([]);

    const tip_usuario = getTipoUsuario();

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientes.map((clientes) => (
                                        <TableRow
                                            key={clientes.id}
                                            hover
                                            //onClick={(event) => handleClick(event, clientes.id)}
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pets.map((pets) => (
                                        <TableRow
                                            key={pets.id}
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, pets.id)
                                            }
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell>{pets.id}</TableCell>
                                            <TableCell>{pets.nome}</TableCell>
                                            <TableCell>
                                                {pets.especie}
                                            </TableCell>
                                            <TableCell>{pets.raca}</TableCell>
                                            <TableCell>{pets.sexo}</TableCell>
                                            <TableCell>{pets.porte}</TableCell>
                                            <TableCell>{pets.peso}</TableCell>
                                            <TableCell>
                                                {pets.id_cliente}
                                            </TableCell>
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <Button
                                                    color="primary"
                                                    href={
                                                        "./pets/PetsEditar/" +
                                                        pets.id
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={() =>
                                                        deletarPet(pets.id)
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
