import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { checkUserAuth } from "../services/actions/auth";

interface IProtectedRouteProps {
    onlyUnAuth?: boolean,
    component: any
}
const ProtectedRoute = ({ onlyUnAuth = false, component }: IProtectedRouteProps) => {
    const isAuthChecked = useAppSelector(store => store.auth.isAuthChecked);
    const user = useAppSelector(store => store.auth.user);
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [dispatch])

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: IProtectedRouteProps) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);