import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

// import Formulaire from './formulaire/formulaire';
// import Grid from './grid/grid';
import Overview from './overview/overview';

const Routes = ({ match }) => (
  <div>
    {/* <ErrorBoundaryRoute path={`${match.url}/formulaire`} component={Formulaire} />
    <ErrorBoundaryRoute path={`${match.url}/grid`} component={Grid} /> */}
    <ErrorBoundaryRoute path={`${match.url}`} component={Overview} />
  </div>
);

export default Routes;
