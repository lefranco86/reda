import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './internship.reducer';
import { IInternship } from 'app/shared/model/internship.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInternshipDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InternshipDetail extends React.Component<IInternshipDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { internshipEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.internship.detail.title">Internship</Translate> [<b>{internshipEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="hourlyRate">
                <Translate contentKey="redaApp.internship.hourlyRate">Hourly Rate</Translate>
              </span>
            </dt>
            <dd>{internshipEntity.hourlyRate}</dd>
            <dt>
              <span id="weeklyHour">
                <Translate contentKey="redaApp.internship.weeklyHour">Weekly Hour</Translate>
              </span>
            </dt>
            <dd>{internshipEntity.weeklyHour}</dd>
            <dt>
              <span id="specialRate">
                <Translate contentKey="redaApp.internship.specialRate">Special Rate</Translate>
              </span>
            </dt>
            <dd>{internshipEntity.specialRate}</dd>
            <dt>
              <span id="start">
                <Translate contentKey="redaApp.internship.start">Start</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={internshipEntity.start} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="end">
                <Translate contentKey="redaApp.internship.end">End</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={internshipEntity.end} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="redaApp.internship.interview">Interview</Translate>
            </dt>
            <dd>{internshipEntity.interview ? internshipEntity.interview.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/internship" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/internship/${internshipEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ internship }: IRootState) => ({
  internshipEntity: internship.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternshipDetail);
