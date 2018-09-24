import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './offer.reducer';
import { IOffer } from 'app/shared/model/offer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOfferProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Offer extends React.Component<IOfferProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { offerList, match } = this.props;
    return (
      <div>
        <h2 id="offer-heading">
          <Translate contentKey="redaApp.offer.home.title">Offers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.offer.home.createLabel">Create new Offer</Translate>
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
                  <Translate contentKey="redaApp.offer.weeklyHour">Weekly Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.offer.hourlyRate">Hourly Rate</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.offer.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.offer.technology">Technology</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.offer.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.offer.offerType">Offer Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {offerList.map((offer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${offer.id}`} color="link" size="sm">
                      {offer.id}
                    </Button>
                  </td>
                  <td>{offer.weeklyHour}</td>
                  <td>{offer.hourlyRate}</td>
                  <td>{offer.description}</td>
                  <td>{offer.technology ? <Link to={`technology/${offer.technology.id}`}>{offer.technology.id}</Link> : ''}</td>
                  <td>{offer.employee ? <Link to={`employee/${offer.employee.id}`}>{offer.employee.id}</Link> : ''}</td>
                  <td>{offer.offerType ? <Link to={`offer-type/${offer.offerType.id}`}>{offer.offerType.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${offer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${offer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${offer.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ offer }: IRootState) => ({
  offerList: offer.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offer);
