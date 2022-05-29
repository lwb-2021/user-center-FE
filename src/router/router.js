import Login from "../views/Login.vue";
import Register from "../views/Register";
import SSOAuth from "../views/SSOAuth";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/sso/auth",
        name: "SSOAuth",
        component: SSOAuth
    },
    {
        path: "/",
        redirect: "/login"
    }
]

export {routes as default}