import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function UsuariosEditar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.container);

    const [nome_usuario, setNome] = useState("");
    const [email_usuario, setEmail] = useState("");
    const [cep_usuario, setCep] = useState("");
    const [endereco_usuario, setEndereco] = useState("");
    const [numero_usuario, setNumero] = useState("");
    const [complemento_usuario, setComplemento] = useState("");
    const [bairro_usuario, setBairro] = useState("");
    const [cidade_usuario, setCidade] = useState("");
    const [uf_usuario, setUF] = useState("");
    const [fone_usuario, setFone] = useState("");
    const [senhaAtual_usuario, setSenhaAtual] = useState("");
    //const [senhaNova_usuario, setSenhaNova] = useState("");
    //const [confirmaSenha_usuario, setConfirmaSenha] = useState("");
    const [tip_usuario, setTipoUsuario] = useState("");

    const { id } = useParams();

    useEffect(() => {
        async function getUsuario() {
            var response = await api.get("/usuarios?id=" + id);

            setNome(response.data[0].nome);
            setEmail(response.data[0].email);
            setCep(response.data[0].cep);
            setEndereco(response.data[0].endereco);
            setNumero(response.data[0].numero);
            setComplemento(response.data[0].complemento);
            setBairro(response.data[0].bairro);
            setCidade(response.data[0].cidade);
            setUF(response.data[0].uf);
            setFone(response.data[0].fone);
            setSenhaAtual(response.data[0].senha);
            setTipoUsuario(response.data[0].tipo_usuario);
        }
        getUsuario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function submitUsuario() {
        const data = {
            nome: nome_usuario,
            email: email_usuario,
            cep: cep_usuario,
            endereco: endereco_usuario,
            numero: numero_usuario,
            complemento: complemento_usuario,
            bairro: bairro_usuario,
            cidade: cidade_usuario,
            uf: uf_usuario,
            fone: fone_usuario,
            senha: senhaAtual_usuario,
            tipo_usuario: tip_usuario,
        };

        const response = await api.put("/usuarios/" + id, data);
        if (response.status === 200) {
            window.location.href = "/Usuarios";
        } else {
            alert(
                "Ocorreu um erro na atualização do registro. Tente novamente! Erro: " +
                    response.status
            );
        }
    }

    const tipos = [
        {
            value: "A",
            label: "Administrador",
        },
        {
            value: "U",
            label: "Usuário",
        },
    ];

    const handleChange = (event) => {
        setTipoUsuario(event.target.value);
    };

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Editar Usuário"} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    id="nome"
                                    name="nome"
                                    label="Nome"
                                    fullWidth
                                    autoComplete="name"
                                    value={nome_usuario}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <TextField
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    fullWidth
                                    autoComplete="email"
                                    value={email_usuario}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    id="cep"
                                    name="cep"
                                    label="Cep"
                                    fullWidth
                                    autoComplete="shipping"
                                    value={cep_usuario}
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <TextField
                                    id="endereco"
                                    name="endereco"
                                    label="Endereço"
                                    fullWidth
                                    value={endereco_usuario}
                                    onChange={(e) =>
                                        setEndereco(e.target.value)
                                    }
                                />
                                <TextField
                                    id="numero"
                                    name="numero"
                                    label="Número"
                                    fullWidth
                                    value={numero_usuario}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                                <TextField
                                    id="complemento"
                                    name="complemento"
                                    label="Complemento"
                                    fullWidth
                                    value={complemento_usuario}
                                    onChange={(e) =>
                                        setComplemento(e.target.value)
                                    }
                                />
                                <TextField
                                    id="bairro"
                                    name="bairro"
                                    label="Bairro"
                                    fullWidth
                                    value={bairro_usuario}
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                                <TextField
                                    id="cidade"
                                    name="cidade"
                                    label="Cidade"
                                    fullWidth
                                    value={cidade_usuario}
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                                <TextField
                                    id="uf"
                                    name="uf"
                                    label="UF"
                                    fullWidth
                                    value={uf_usuario}
                                    onChange={(e) => setUF(e.target.value)}
                                />
                                <TextField
                                    id="fone"
                                    name="fone"
                                    label="Fone"
                                    fullWidth
                                    value={fone_usuario}
                                    onChange={(e) => setFone(e.target.value)}
                                />
                                <TextField
                                    id="senha_atu"
                                    name="senha-Atu"
                                    label="Senha Atual"
                                    fullWidth
                                    value={senhaAtual_usuario}
                                    onChange={(e) =>
                                        setSenhaAtual(e.target.value)
                                    }
                                />
                                <TextField
                                    id="tipo_usuario"
                                    select
                                    label="Tipo Usuário"
                                    value={tip_usuario}
                                    onChange={handleChange}
                                    helperText="Selecione o tipo de Usuário."
                                >
                                    {tipos.map((option) => (
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
                                    onClick={submitUsuario}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="/Usuarios"
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
