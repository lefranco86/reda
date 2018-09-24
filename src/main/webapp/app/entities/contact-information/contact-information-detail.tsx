import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contact-information.reducer';
import { IContactInformation } from 'app/shared/model/contact-information.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactInformationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContactInformationDetail extends React.Component<IContactInformationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contactInformationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.contactInformation.detail.title">ContactInformation</Translate> [
            <b>{contactInformationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="street">
                <Translate contentKey="redaApp.contactInformation.street">Street</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.street}</dd>
            <dt>
              <span id="civicNumber">
                <Translate contentKey="redaApp.contactInformation.civicNumber">Civic Number</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.civicNumber}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="redaApp.contactInformation.city">City</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.city}</dd>
            <dt>
              <span id="postalCode">
                <Translate contentKey="redaApp.contactInformation.postalCode">Postal Code</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.postalCode}</dd>
            <dt>
              <span id="apartment">
                <Translate contentKey="redaApp.contactInformation.apartment">Apartment</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.apartment}</dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="redaApp.contactInformation.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.phoneNumber}</dd>
            <dt>
              <span id="phonePost">
                <Translate contentKey="redaApp.contactInformation.phonePost">Phone Post</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.phonePost}</dd>
            <dt>
              <span id="faxNumber">
                <Translate contentKey="redaApp.contactInformation.faxNumber">Fax Number</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.faxNumber}</dd>
            <dt>
              <span id="faxPost">
                <Translate contentKey="redaApp.contactInformation.faxPost">Fax Post</Translate>
              </span>
            </dt>
            <dd>{contactInformationEntity.faxPost}</dd>
            <dt>
              <Translate contentKey="redaApp.contactInformation.country">Country</Translate>
            </dt>
            <dd>{contactInformationEntity.country ? contactInformationEntity.country.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/contact-information" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/contact-information/${contactInformationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ contactInformation }: IRootState) => ({
  contactInformationEntity: contactInformation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInformationDetail);
