import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OfferType from './offer-type';
import OfferTypeDetail from './offer-type-detail';
import OfferTypeUpdate from './offer-type-update';
import OfferTypeDeleteDialog from './offer-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OfferTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OfferTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OfferTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={OfferType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={OfferTypeDeleteDialog} />
  </>
);

export default Routes;
