import { selectAuthIsLogged, useAuth } from '@/services/auth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export function PrivateRoute(props: PropsWithChildren) {
  const isLogged = useAuth(selectAuthIsLogged);

  return <>{isLogged ? props.children : <Navigate to="/login" />}</>;
}
