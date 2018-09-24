import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './student-offer.reducer';
import { IStudentOffer } from 'app/shared/model/student-offer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentOfferDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StudentOfferDetail extends React.Component<IStudentOfferDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentOfferEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.studentOffer.detail.title">StudentOffer</Translate> [<b>{studentOfferEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">
                <Translate contentKey="redaApp.studentOffer.status">Status</Translate>
              </span>
            </dt>
            <dd>{studentOfferEntity.status}</dd>
            <dt>
              <Translate contentKey="redaApp.studentOffer.offer">Offer</Translate>
            </dt>
            <dd>{studentOfferEntity.offer ? studentOfferEntity.offer.id : ''}</dd>
            <dt>
              <Translate contentKey="redaApp.studentOffer.student">Student</Translate>
            </dt>
            <dd>{studentOfferEntity.student ? studentOfferEntity.student.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/student-offer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/student-offer/${studentOfferEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ studentOffer }: IRootState) => ({
  studentOfferEntity: studentOffer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentOfferDetail);
