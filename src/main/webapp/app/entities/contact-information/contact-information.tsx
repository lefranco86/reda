import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contact-information.reducer';
import { IContactInformation } from 'app/shared/model/contact-information.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactInformationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ContactInformation extends React.Component<IContactInformationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contactInformationList, match } = this.props;
    return (
      <div>
        <h2 id="contact-information-heading">
          <Translate contentKey="redaApp.contactInformation.home.title">Contact Informations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.contactInformation.home.createLabel">Create new Contact Information</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.street">Street</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.civicNumber">Civic Number</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.apartment">Apartment</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.phonePost">Phone Post</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.faxNumber">Fax Number</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.contactInformation.faxPost">Fax Post</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contactInformationList.map((contactInformation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${contactInformation.id}`} color="link" size="sm">
                      {contactInformation.id}
                    </Button>
                  </td>
                  <td>{contactInformation.street}</td>
                  <td>{contactInformation.civicNumber}</td>
                  <td>{contactInformation.city}</td>
                  <td>{contactInformation.postalCode}</td>
                  <td>{contactInformation.apartment}</td>
                  <td>{contactInformation.phoneNumber}</td>
                  <td>{contactInformation.phonePost}</td>
                  <td>{contactInformation.faxNumber}</td>
                  <td>{contactInformation.faxPost}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contactInformation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contactInformation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contactInformation.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contactInformation }: IRootState) => ({
  contactInformationList: contactInformation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInformation);
