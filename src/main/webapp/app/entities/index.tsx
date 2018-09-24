import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Student from './student';
import ContactInformation from './contact-information';
import Country from './country';
import Province from './province';
import Entreprise from './entreprise';
import Employee from './employee';
import Teacher from './teacher';
import Cohort from './cohort';
import Offer from './offer';
import StudentOffer from './student-offer';
import Interview from './interview';
import Internship from './internship';
import Document from './document';
import DocumentType from './document-type';
import Technology from './technology';
import OfferType from './offer-type';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/student`} component={Student} />
      <ErrorBoundaryRoute path={`${match.url}/contact-information`} component={ContactInformation} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/province`} component={Province} />
      <ErrorBoundaryRoute path={`${match.url}/entreprise`} component={Entreprise} />
      <ErrorBoundaryRoute path={`${match.url}/employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}/teacher`} component={Teacher} />
      <ErrorBoundaryRoute path={`${match.url}/cohort`} component={Cohort} />
      <ErrorBoundaryRoute path={`${match.url}/offer`} component={Offer} />
      <ErrorBoundaryRoute path={`${match.url}/student-offer`} component={StudentOffer} />
      <ErrorBoundaryRoute path={`${match.url}/interview`} component={Interview} />
      <ErrorBoundaryRoute path={`${match.url}/internship`} component={Internship} />
      <ErrorBoundaryRoute path={`${match.url}/document`} component={Document} />
      <ErrorBoundaryRoute path={`${match.url}/document-type`} component={DocumentType} />
      <ErrorBoundaryRoute path={`${match.url}/technology`} component={Technology} />
      <ErrorBoundaryRoute path={`${match.url}/offer-type`} component={OfferType} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
