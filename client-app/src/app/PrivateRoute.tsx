import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import userStore from "./stores/userStore";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({component: Component, ...rest}: Props) {
    const isLoggedIn= userStore.isLoggedIn();

    return (
        <Route 
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />}
        />
    )
}