import React, { Fragment, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAdmin, isAuthenticated, loading, user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login', { replace: true });
        }
        if (isAdmin && user && user.role !== 'admin') {
            navigate('/', { replace: true });
        }
    }, [navigate, user, isAdmin]);

    return <Fragment>{children}</Fragment>;
}
