import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkUserAuth } from "../services/actions/auth";

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useSelector(store => store.auth.isAuthChecked);
    const user = useSelector(store => store.auth.user);
    const location = useLocation();
    const dispatch = useDispatch();

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
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);