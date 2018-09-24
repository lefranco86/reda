import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Internship from './internship';
import InternshipDetail from './internship-detail';
import InternshipUpdate from './internship-update';
import InternshipDeleteDialog from './internship-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InternshipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InternshipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InternshipDetail} />
      <ErrorBoundaryRoute path={match.url} component={Internship} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InternshipDeleteDialog} />
  </>
);

export default Routes;
