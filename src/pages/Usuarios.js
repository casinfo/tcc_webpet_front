import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

//import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";

import MenuAdmin from "../pages/MenuAdmin";
import { Button, ButtonGroup } from "@material-ui/core";

//import Title from "./Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import api from "../services/api";

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

export default function Usuarios() {
    const classes = useStyles();

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function carregarUsuarios() {
            const response = await api.get("/usuarios");

            setUsuarios(response.data);
        }
        carregarUsuarios();
    }, []);

    async function deletarUsuario(id){
        if(window.confirm('Confirma a exclusão desse usuário?')){
            var result = await api.delete("/usuarios/"+id);

            if (result.status === 200){
                window.location.href = "/Usuarios";
            } else {
                alert("Ocorreu um erro na exclusão do registro. Tente novamente!");
            }
        }
    }

    return (
        <div className={classes.root}>
            <MenuAdmin title={"Usuários"} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table
                                size={"small"} 
                            >
                                <TableHead>
                                    <TableRow key={usuarios.id}>
                                        <TableCell component="th" scope="row">
                                            Código Usuário
                                        </TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>E-mail</TableCell>
                                        <TableCell>CPF</TableCell>
                                        <TableCell>Fone</TableCell>
                                        <TableCell>Tipo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usuarios.map((usuarios) => (
                                        <TableRow key={usuarios.id}>
                                            <TableCell>{usuarios.id}</TableCell>
                                            <TableCell>
                                                {usuarios.nome}
                                            </TableCell>
                                            <TableCell>
                                                {usuarios.email}
                                            </TableCell>
                                            <TableCell>
                                                {usuarios.cpf}
                                            </TableCell>
                                            <TableCell>
                                                {usuarios.fone}
                                            </TableCell>
                                            <TableCell>
                                                {usuarios.tipo_usuario==="U"?<Chip label="Usuário" color="primary"/>:<Chip label="Administrador" color="secondary"/>}
                                            </TableCell>
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <Button
                                                    color="primary"
                                                    href={
                                                        "./Usuarios/UsuariosEditar/"+(usuarios.id)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button color="secondary" onClick={()=> deletarUsuario(usuarios.id)}>
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
                                    href={"./Usuarios/UsuariosCadastrar"}
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