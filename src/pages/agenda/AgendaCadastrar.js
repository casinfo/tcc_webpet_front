import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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

export default function AgendaCadastrar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [id_cliente, setCliente] = useState("");
    const [id_pet, setPet] = useState("");
    const [id_usuario, setUsuario] = useState("");
    const [id_servico, setServico] = useState("");

    const [clientes, setClientes] = useState([]);
    const [pets, setPets] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function carregarClientes() {
            const response = await api.get("/clientes");

            setClientes(response.data);
        }
        carregarClientes();

        async function carregarPets() {
            const response = await api.get("/pets");

            setPets(response.data);
        }
        carregarPets();

        async function carregarServicos() {
            const response = await api.get("/servicos");

            setServicos(response.data);
        }
        carregarServicos();

        async function carregarUsuarios() {
            const response = await api.get("/usuarios");

            setUsuarios(response.data);
        }
        carregarUsuarios();
    }, []);

    async function submitAgenda() {
        const dataAgenda = {
            data: data,
            hora: hora,
            id_cliente: id_cliente,
            id_pet: id_pet,
            id_usuario: id_usuario,
            id_servico: id_servico,
            confirmado: "NAO",
            observacao: "",
            concluido: "NAO",
            hora_conclusao: "",
        };

        console.log(dataAgenda);

        const response = await api.post("/agenda", dataAgenda);

        if (response.status === 200) {
            window.location.href = "/Agenda";
        } else {
            alert(
                "Ocorreu um erro na inclusão do cliente. Tente novamente! Erro: " +
                    response.status
            );
        }
    }

    const theme = useTheme();
    const [clienteNome, setClienteNome] = React.useState([]);
    const [petNome, setPetNome] = React.useState([]);
    const [servicoNome, setServicoNome] = React.useState([]);
    const [usuarioNome, setUsuarioNome] = React.useState([]);

    const handleChangeNome = (event) => {
        setClienteNome(event.target.value);
        setCliente(event.target.value);
    };

    const handleChangePet = (event) => {
        setPetNome(event.target.value);
        setPet(event.target.value);
    };

    const handleChangeServico = (event) => {
        setServicoNome(event.target.value);
        setServico(event.target.value);
    };

    const handleChangeUsuario = (event) => {
        setUsuarioNome(event.target.value);
        setUsuario(event.target.value);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Cadastrar Agenda"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    id="date"
                                    label="Data"
                                    type="date"
                                    defaultValue={Date().toString}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setData(e.target.value)}
                                />
                                <TextField
                                    id="hora"
                                    label="Hora"
                                    type="time"
                                    defaultValue=""
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 1800, // 30 min
                                    }}
                                    onChange={(e) => setHora(e.target.value)}
                                />
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="id_cliente">
                                        Cliente
                                    </InputLabel>
                                    <Select
                                        labelId="id_cliente-label"
                                        id="id_cliente"
                                        value={clienteNome}
                                        onChange={handleChangeNome}
                                        input={<Input />}
                                        MenuProps={MenuProps}
                                    >
                                        {clientes.map((clientes) => (
                                            <MenuItem
                                                key={clientes.id}
                                                value={clientes.id}
                                                name={clientes.nome}
                                                style={getStyles(
                                                    clientes.id,
                                                    clientes.nome,
                                                    theme
                                                )}
                                            >
                                                {clientes.nome} | Código:{" "}
                                                {clientes.id}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="id_pet">Pet</InputLabel>
                                    <Select
                                        labelId="id_pet-label"
                                        id="id_pet"
                                        value={petNome}
                                        onChange={handleChangePet}
                                        input={<Input />}
                                        MenuProps={MenuProps}
                                    >
                                        {pets.map((pets) => (
                                            <MenuItem
                                                key={pets.id}
                                                value={pets.id}
                                                name={pets.nome}
                                                style={getStyles(
                                                    pets.id,
                                                    pets.nome,
                                                    theme
                                                )}
                                            >
                                                {pets.nome} | Código: {pets.id}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="id_servico">
                                        Serviço
                                    </InputLabel>
                                    <Select
                                        labelId="id_servico-label"
                                        id="id_servico"
                                        value={servicoNome}
                                        onChange={handleChangeServico}
                                        input={<Input />}
                                        MenuProps={MenuProps}
                                    >
                                        {servicos.map((servicos) => (
                                            <MenuItem
                                                key={servicos.id}
                                                value={servicos.id}
                                                name={servicos.descricao}
                                                style={getStyles(
                                                    servicos.id,
                                                    servicos.descricao,
                                                    theme
                                                )}
                                            >
                                                {servicos.descricao}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                >
                                    <InputLabel id="id_usuario">
                                        Usuário
                                    </InputLabel>
                                    <Select
                                        labelId="id_usuario-label"
                                        id="id_usuario"
                                        value={usuarioNome}
                                        onChange={handleChangeUsuario}
                                        input={<Input />}
                                        MenuProps={MenuProps}
                                    >
                                        {usuarios.map((usuarios) => (
                                            <MenuItem
                                                key={usuarios.id}
                                                value={usuarios.id}
                                                name={usuarios.nome}
                                                style={getStyles(
                                                    usuarios.id,
                                                    usuarios.nome,
                                                    theme
                                                )}
                                            >
                                                {usuarios.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={submitAgenda}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="/Agenda"
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
