import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import api from "../services/api";
import { logout, getToken } from "./auth";

export default function WAuth({ component: Component, ...rest }) {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify() {
            var res = await api.get("/checkToken", {
                params: { token: getToken() },
            });

            if (res.data.status === 200) {
                setLoading(false);
                setRedirect(false);
            } else {
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, []);

    return loading ? (
        "Aguarde carregando..."
    ) : (
        <Route
            {...rest}
            render={(props) =>
                !redirect ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}
