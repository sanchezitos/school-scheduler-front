import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import './routeCrambs.css'

export function RouterBreadcrumbs () {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs-container">
    <Link component={RouterLink} to="/" className="breadcrumb-link">
      Inicio
    </Link>
    {pathnames.map((value, index) => {
      const last = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;

      return last ? (
        <Typography color="textPrimary" key={to} className="breadcrumb-text">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Typography>
      ) : (
        <Link component={RouterLink} to={to} key={to} className="breadcrumb-link">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Link>
      );
    })}
  </Breadcrumbs>
  );
}

export default RouterBreadcrumbs;
