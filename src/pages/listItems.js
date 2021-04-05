import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import PetsIcon from "@material-ui/icons/Pets";
import PeopleIcon from "@material-ui/icons/People";
import RoomService from "@material-ui/icons/RoomService";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Face from "@material-ui/icons/Face";
import api from "../services/api";
import { getToken, logout } from "../services/auth";

export const mainListItems = (
    <div>
        <ListItem button component="a" href="/Dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/Agenda">
            <ListItemIcon>
                <Schedule />
            </ListItemIcon>
            <ListItemText primary="Agenda" />
        </ListItem>
        <ListItem button component="a" href="/Clientes">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItem>
        <ListItem button component="a" href="/Pets">
            <ListItemIcon>
                <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="Pets" />
        </ListItem>
        <ListItem button component="a" href="/Servicos">
            <ListItemIcon>
                <RoomService />
            </ListItemIcon>
            <ListItemText primary="Serviços" />
        </ListItem>
        <ListItem button component="a" href="/Usuarios">
            <ListItemIcon>
                <Face />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
        </ListItem>
        <ListItem button component="a" onClick={confirmaSaida}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
        </ListItem>
    </div>
);

async function confirmaSaida() {
    if (window.confirm("Sair do sistema?")) {
        const response = await api.get("/destroyToken", {
            headers: { token: getToken() },
        });

        console.log(response);
        if (response.status === 200) {
            logout();
            window.location.href = "/";
        } else {
            alert("Erro ao encerrar sessão!");
        }
    }
}
