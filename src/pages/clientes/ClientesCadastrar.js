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

export default function ClientesCadastrar() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.container);

    const [nome_cliente, setNome] = useState("");
    const [email_cliente, setEmail] = useState("");
    const [cep_cliente, setCep] = useState("");
    const [endereco_cliente, setEndereco] = useState("");
    const [numero_cliente, setNumero] = useState("");
    const [complemento_cliente, setComplemento] = useState("");
    const [bairro_cliente, setBairro] = useState("");
    const [cidade_cliente, setCidade] = useState("");
    const [uf_cliente, setUF] = useState("");
    const [fone_cliente, setFone] = useState("");
    const [cpf, setCPF] = useState("");

    const [dashClientes, setDash] = useState([]);
    const [idDash, setIdDash] = useState([]);
    const [ano, setAnoDash] = useState([]);
    const [mes, setMesDash] = useState([]);
    const [qtd, setQtdDash] = useState([]);
    const [tot, setTotDash] = useState([]);

    async function submitCliente() {
        const data = {
            nome: nome_cliente,
            email: email_cliente,
            cep: cep_cliente,
            endereco: endereco_cliente,
            numero: numero_cliente,
            complemento: complemento_cliente,
            bairro: bairro_cliente,
            cidade: cidade_cliente,
            uf: uf_cliente,
            fone: fone_cliente,
            cpf: cpf,
        };

        if (
            nome_cliente !== "" &&
            email_cliente !== "" &&
            fone_cliente !== "" &&
            cpf !== ""
        ) {
            const response = await api.post("/clientes", data);
            if (response.status === 200) {
                // atualiza dashboard
                //await submitDashCliente();

                window.location.href = "/clientes";
            } else if (response.status === 401) {
                alert("Os campos não foram preenchidos corretamente!");
            } else {
                alert(
                    "Ocorreu um erro na inclusão do cliente. Tente novamente! Erro: " +
                        response.status
                );
            }
        } else {
            alert("Os campos não foram preenchidos corretamente!");
        }
    }

    useEffect(() => {
        // Obtém a data/hora atual
        var dataAtu = new Date();
        //var dia = data.getDate(); // 1-31
        //var dia_sem = data.getDay(); // 0-6 (zero=domingo)
        var mesAtu = dataAtu.getMonth(); // 0-11 (zero=janeiro)
        //var ano2 = data.getYear(); // 2 dígitos
        var anoAtu = dataAtu.getFullYear(); // 4 dígitos

        async function lerDash() {
            const response = await api.get("/dashclientes");

            console.log("Api-response", response.data);

            //setDash(response.data);

            const resp = response.data;

            const filtroDash = (r) => r.ano === anoAtu && r.mes === mesAtu;

            const regDash = resp.filter(filtroDash);

            console.log("dashClientes", dashClientes, resp);
            console.log("filtroDash", regDash);

            //console.log(regDash);

            setIdDash(regDash.id);
            setAnoDash(regDash.ano);
            setMesDash(regDash.mes);
            setQtdDash(regDash.qtd);
            setTotDash(regDash.tot);
        }
        lerDash();
    }, []);

    async function submitDashCliente() {
        const data = {
            ano: ano,
            mes: mes,
            qtd: qtd,
            tot: tot,
        };
        console.log("Koe", idDash, data);
        const response = await api.put("/dashclientes/" + idDash, data);

        if (response.status === 200) {
            //window.location.href = "/clientes";
        } else {
            if (response.status === 400) {
                alert(response.error);
            } else {
                alert(
                    "Ocorreu um erro na inclusão do dash cliente. Tente novamente! Erro: " +
                        response.status
                );
            }
        }
    }

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Cadastrar Cliente"} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Paper className={fixedHeightPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    required
                                    id="nome"
                                    name="nome"
                                    label="Nome"
                                    fullWidth
                                    autoComplete="name"
                                    value={nome_cliente}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    fullWidth
                                    autoComplete="email"
                                    value={email_cliente}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    id="cep"
                                    name="cep"
                                    label="Cep"
                                    fullWidth
                                    autoComplete="shipping"
                                    value={cep_cliente}
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <TextField
                                    id="endereco"
                                    name="endereco"
                                    label="Endereço"
                                    fullWidth
                                    value={endereco_cliente}
                                    onChange={(e) =>
                                        setEndereco(e.target.value)
                                    }
                                />
                                <TextField
                                    id="numero"
                                    name="numero"
                                    label="Número"
                                    fullWidth
                                    value={numero_cliente}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                                <TextField
                                    id="complemento"
                                    name="complemento"
                                    label="Complemento"
                                    fullWidth
                                    value={complemento_cliente}
                                    onChange={(e) =>
                                        setComplemento(e.target.value)
                                    }
                                />
                                <TextField
                                    id="bairro"
                                    name="bairro"
                                    label="Bairro"
                                    fullWidth
                                    value={bairro_cliente}
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                                <TextField
                                    id="cidade"
                                    name="cidade"
                                    label="Cidade"
                                    fullWidth
                                    value={cidade_cliente}
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                                <TextField
                                    id="uf"
                                    name="uf"
                                    label="UF"
                                    fullWidth
                                    value={uf_cliente}
                                    onChange={(e) => setUF(e.target.value)}
                                />
                                <TextField
                                    id="fone"
                                    name="fone"
                                    label="Fone"
                                    fullWidth
                                    value={fone_cliente}
                                    onChange={(e) => setFone(e.target.value)}
                                />
                                <TextField
                                    id="cpf"
                                    name="cpf"
                                    label="CPF"
                                    fullWidth
                                    value={cpf}
                                    onChange={(e) => setCPF(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={submitCliente}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    href="/clientes"
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
