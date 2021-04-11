import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useParams } from "react-router-dom";
import { lightFormat } from "date-fns";

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

export default function PetsEditar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.container);

    const [id_cliente, setIdCliente] = useState("");
    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("");
    const [raca, setRaca] = useState("");
    const [data_nascto, setDataNascto] = useState("");
    const [peso, setPeso] = useState("");
    const [vacinado, setVacinado] = useState("");
    const [porte, setPorte] = useState("");
    const [sexo, setSexo] = useState("");

    const { id } = useParams();

    useEffect(() => {
        async function getPet() {
            const response = await api.get("/pets?id=" + id);

            setIdCliente(response.data[0].id_cliente);
            setNome(response.data[0].nome);
            setEspecie(response.data[0].especie);
            setRaca(response.data[0].raca);
            setDataNascto(response.data[0].data_nascto);
            setPeso(response.data[0].peso);
            setVacinado(response.data[0].vacinado);
            setPorte(response.data[0].porte);
            setSexo(response.data[0].sexo);

            console.log("datadenasc", data_nascto, response);
        }
        getPet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function submitPets() {
        const data = {
            id_cliente: id_cliente,
            nome: nome,
            especie: especie,
            raca: raca,
            data_nascto: data_nascto,
            peso: peso,
            vacinado: vacinado,
            porte: porte,
            sexo: sexo,
        };

        const response = await api.put("/pets/" + id, data);

        if (
            nome !== "" &&
            especie !== "" &&
            peso !== "" &&
            vacinado !== "" &&
            porte !== "" &&
            sexo !== ""
        ) {
            if (response.status === 200) {
                window.location.href = "/Clientes";
            } else {
                if (response.status === 401) {
                    alert("Os campos não foram preenchidos corretamente!");
                } else {
                    alert(
                        "Ocorreu um erro na alteração do Pet. Tente novamente! Erro: " +
                            response.status
                    );
                }
            }
        } else {
            alert("Os campos não foram preenchidos corretamente!");
        }
    }

    const tp_especie = [
        {
            value: "Canina",
            label: "Canina",
        },
        {
            value: "Felina",
            label: "Felina",
        },
        {
            value: "Outras",
            label: "Outras",
        },
    ];

    const handleEspecie = (event) => {
        setEspecie(event.target.value);
    };

    const tp_vacinado = [
        {
            value: "Sim",
            label: "Sim",
        },
        {
            value: "Não",
            label: "Não",
        },
    ];

    const handleVacinado = (event) => {
        setVacinado(event.target.value);
    };

    const tp_porte = [
        {
            value: "Micro",
            label: "Micro",
        },
        {
            value: "Mini",
            label: "Mini",
        },
        {
            value: "Pequeno",
            label: "Pequeno",
        },
        {
            value: "Médio",
            label: "Médio",
        },
        {
            value: "Grande",
            label: "Grande",
        },
        {
            value: "Gigante",
            label: "Gigante",
        },
    ];

    const handlePorte = (event) => {
        setPorte(event.target.value);
    };

    const tp_sexo = [
        {
            value: "Macho",
            label: "Macho",
        },
        {
            value: "Fêmea",
            label: "Fêmea",
        },
    ];

    const handleSexo = (event) => {
        setSexo(event.target.value);
    };

    const handleData = (event) => {
        setDataNascto(event.target.value);
    };

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Pets"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    id="id_cliente"
                                    name="id_cliente"
                                    label="Código"
                                    fullWidth
                                    value={id_cliente}
                                    onChange={(e) =>
                                        setIdCliente(e.target.value)
                                    }
                                    //disabled
                                />
                                <TextField
                                    required
                                    id="nome"
                                    name="nome"
                                    label="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    id="especie"
                                    select
                                    label="Espécie"
                                    value={especie}
                                    fullWidth
                                    onChange={handleEspecie}
                                >
                                    {tp_especie.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="raca"
                                    name="raca"
                                    label="Raça"
                                    fullWidth
                                    value={raca}
                                    onChange={(e) => setRaca(e.target.value)}
                                />
                                <TextField
                                    id="data_nascto"
                                    label="Data de Nascimento"
                                    type="date"
                                    value={() =>
                                        lightFormat(
                                            new Date(data_nascto),
                                            "dd/MM/yyyy"
                                        )
                                    }
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        setDataNascto(e.target.value)
                                    }
                                />
                                <TextField
                                    id="peso"
                                    name="peso"
                                    label="Peso"
                                    fullWidth
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                />
                                <TextField
                                    id="vacinado"
                                    select
                                    label="Vacinado"
                                    value={vacinado}
                                    fullWidth
                                    onChange={handleVacinado}
                                >
                                    {tp_vacinado.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="porte"
                                    select
                                    label="Porte"
                                    value={porte}
                                    fullWidth
                                    onChange={handlePorte}
                                >
                                    {tp_porte.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="sexo"
                                    select
                                    label="Sexo"
                                    value={sexo}
                                    fullWidth
                                    onChange={handleSexo}
                                >
                                    {tp_sexo.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={submitPets}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="/Clientes"
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
