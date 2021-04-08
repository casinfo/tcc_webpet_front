import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import AgendaCadastrar from "./pages/agenda/AgendaCadastrar";
import Clientes from "./pages/Clientes";
import ClientesCadastrar from "./pages/clientes/ClientesCadastrar";
import ClientesEditar from "./pages/clientes/ClientesEditar";
import Pets from "./pages/Pets";
import PetsCadastrar from "./pages/pets/PetsCadastrar";
import PetsEditar from "./pages/pets/PetsEditar";
import Servicos from "./pages/Servicos";
import ServicosCadastrar from "./pages/servicos/ServicosCadastrar";
import ServicosEditar from "./pages/servicos/ServicosEditar";
import Usuarios from "./pages/Usuarios";
import UsuariosCadastrar from "./pages/usuarios/UsuariosCadastrar";
import UsuariosEditar from "./pages/usuarios/UsuariosEditar";
import PrivateRoute from "./services/wAuth";

export function useRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/Home" exact component={Home} />
                <PrivateRoute path="/Dashboard" exact component={Dashboard} />
                <PrivateRoute path="/Agenda" exact component={Agenda} />
                <PrivateRoute
                    path="/agenda/AgendaCadastrar"
                    exact
                    component={AgendaCadastrar}
                />
                <PrivateRoute path="/Clientes" exact component={Clientes} />
                <PrivateRoute
                    path="/clientes/ClientesCadastrar"
                    exact
                    component={ClientesCadastrar}
                />
                <PrivateRoute
                    path="/clientes/ClientesEditar/:id"
                    exact
                    component={ClientesEditar}
                />
                <PrivateRoute path="/Pets" exact component={Pets} />
                <PrivateRoute
                    path="/pets/PetsCadastrar"
                    exact
                    component={PetsCadastrar}
                />
                <PrivateRoute
                    path="/pets/PetsEditar/:id"
                    component={PetsEditar}
                />
                <PrivateRoute path="/Servicos" exact component={Servicos} />
                <PrivateRoute
                    path="/servicos/ServicosCadastrar"
                    exact
                    component={ServicosCadastrar}
                />
                <PrivateRoute
                    path="/servicos/ServicosEditar/:id"
                    component={ServicosEditar}
                />
                <PrivateRoute path="/Usuarios" exact component={Usuarios} />
                <PrivateRoute
                    path="/usuarios/UsuariosCadastrar"
                    exact
                    component={UsuariosCadastrar}
                />
                <PrivateRoute
                    path="/usuarios/UsuariosEditar/:id"
                    component={UsuariosEditar}
                />
            </Switch>
        </BrowserRouter>
    );
}
