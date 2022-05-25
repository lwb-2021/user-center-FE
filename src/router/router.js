import Login from "../views/Login.vue";
import Register from "../views/Register";

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
        path: "/",
        redirect: "/login"
    }
]

export {routes as default}