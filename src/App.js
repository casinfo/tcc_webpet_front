import React from "react";
import { useRoutes } from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
    const routes = useRoutes(true);

    return (
        <Router>
            <div className="container">{routes}</div>
        </Router>
    );
};

export default App;
