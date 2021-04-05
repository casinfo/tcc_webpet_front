import React, { useState } from "react";
//import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PetsIcon from "@material-ui/icons/Pets";
import GoogleLogin from "react-google-login";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

import api from "../services/api";

import {
    setNomeUsuario,
    login,
    setIdUsuario,
    setTipoUsuario,
} from "../services/auth";

function Copyright() {
    return (
        <Typography variant="caption" color="textSecondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                variant="caption"
                href="https://www.casit.com.br/"
            >
                TCC Carlos Alberto da Silva - WebPet-Material UI-
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login({ setToken }) {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [values, setValues] = useState({ showPassword: false });

    const responseGoogle = (res) => {
        console.log(res.profileObj.email);

        async function submitUsuario() {
            const data = {
                nome: res.profileObj.name,
                email: res.profileObj.email,
                cep: "",
                endereco: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "",
                fone: "",
                senha: "webpet001!",
                tipo_usuario: "U",
            };

            const response = await api.post("/usuarios", data);

            if (response.status !== 200) {
                alert(
                    `Ocorreu um erro na inclusão do usuário. Tente novamente! Erro: ${response.error}`
                );
            } else {
            }
        }
        submitUsuario();

        async function submitSessaoGoogle() {
            const data = {
                email: res.profileObj.email,
                senha: "webpet001!",
            };

            const response = await api.post("/sessao", data);

            if (response.data.status !== 200) {
                alert(
                    `Ocorreu um erro na autenticação Google. Tente novamente! Erro: ${response.error}`
                );
            } else {
                login(response.data.token);
                setIdUsuario(response.data.usuario.id);
                setNomeUsuario(response.data.usuario.nome);
                setTipoUsuario(response.data.usuario.tipo_usuario);

                window.location.href = "/Home";
            }
        }
        submitSessaoGoogle();
    };

    async function handleSubmit() {
        const data = {
            email: email,
            senha: senha,
        };

        const response = await api.post("/sessao", data);

        if (response.data.status === 200) {
            login(response.data.token);
            setIdUsuario(response.data.usuario.id);
            setNomeUsuario(response.data.usuario.nome);
            setTipoUsuario(response.data.usuario.tipo_usuario);

            window.location.href = "/Home";
        } else {
            alert(response.data.error);
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PetsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    WebPet
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Informe o e-mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="senha"
                    label="Senha"
                    type={values.showPassword ? "text" : "password"}
                    id="senha"
                    autoComplete="current-password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    position="end"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? (
                                        <VisibilityOutlinedIcon />
                                    ) : (
                                        <VisibilityOffOutlinedIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    LOGIN
                </Button>
                <GoogleLogin
                    clientId="193145381551-tdi4vq2kvshpd3c44b83a3vto5kdpi7d.apps.googleusercontent.com"
                    //clientId="193145381551-5da1ibhmqvqrdn7am1saaodvgvqbjuk5.apps.googleusercontent.com"
                    buttonText="Entre com sua conta Google!"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
