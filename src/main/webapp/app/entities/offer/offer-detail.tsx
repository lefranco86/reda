import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './offer.reducer';
import { IOffer } from 'app/shared/model/offer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOfferDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OfferDetail extends React.Component<IOfferDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { offerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.offer.detail.title">Offer</Translate> [<b>{offerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="weeklyHour">
                <Translate contentKey="redaApp.offer.weeklyHour">Weekly Hour</Translate>
              </span>
            </dt>
            <dd>{offerEntity.weeklyHour}</dd>
            <dt>
              <span id="hourlyRate">
                <Translate contentKey="redaApp.offer.hourlyRate">Hourly Rate</Translate>
              </span>
            </dt>
            <dd>{offerEntity.hourlyRate}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="redaApp.offer.description">Description</Translate>
              </span>
            </dt>
            <dd>{offerEntity.description}</dd>
            <dt>
              <Translate contentKey="redaApp.offer.employee">Employee</Translate>
            </dt>
            <dd>{offerEntity.employee ? offerEntity.employee.id : ''}</dd>
            <dt>
              <Translate contentKey="redaApp.offer.offerType">Offer Type</Translate>
            </dt>
            <dd>{offerEntity.offerType ? offerEntity.offerType.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/offer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/offer/${offerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ offer }: IRootState) => ({
  offerEntity: offer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferDetail);
