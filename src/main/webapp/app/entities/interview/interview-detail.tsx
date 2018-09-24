import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './interview.reducer';
import { IInterview } from 'app/shared/model/interview.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInterviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InterviewDetail extends React.Component<IInterviewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { interviewEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.interview.detail.title">Interview</Translate> [<b>{interviewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="redaApp.interview.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={interviewEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="result">
                <Translate contentKey="redaApp.interview.result">Result</Translate>
              </span>
            </dt>
            <dd>{interviewEntity.result}</dd>
            <dt>
              <Translate contentKey="redaApp.interview.studentOffer">Student Offer</Translate>
            </dt>
            <dd>{interviewEntity.studentOffer ? interviewEntity.studentOffer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/interview" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/interview/${interviewEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ interview }: IRootState) => ({
  interviewEntity: interview.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewDetail);
