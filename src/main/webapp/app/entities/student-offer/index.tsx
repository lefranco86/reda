import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StudentOffer from './student-offer';
import StudentOfferDetail from './student-offer-detail';
import StudentOfferUpdate from './student-offer-update';
import StudentOfferDeleteDialog from './student-offer-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentOfferUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StudentOfferUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StudentOfferDetail} />
      <ErrorBoundaryRoute path={match.url} component={StudentOffer} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StudentOfferDeleteDialog} />
  </>
);

export default Routes;
