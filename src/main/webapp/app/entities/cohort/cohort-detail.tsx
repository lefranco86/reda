import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cohort.reducer';
import { ICohort } from 'app/shared/model/cohort.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICohortDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CohortDetail extends React.Component<ICohortDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cohortEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.cohort.detail.title">Cohort</Translate> [<b>{cohortEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startDate">
                <Translate contentKey="redaApp.cohort.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={cohortEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="redaApp.cohort.teacher">Teacher</Translate>
            </dt>
            <dd>{cohortEntity.teacher ? cohortEntity.teacher.id : ''}</dd>
            <dt>
              <Translate contentKey="redaApp.cohort.student">Student</Translate>
            </dt>
            <dd>{cohortEntity.student ? cohortEntity.student.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/cohort" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/cohort/${cohortEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cohort }: IRootState) => ({
  cohortEntity: cohort.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortDetail);
