import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './student.reducer';
import { IStudent } from 'app/shared/model/student.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StudentDetail extends React.Component<IStudentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.student.detail.title">Student</Translate> [<b>{studentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="registrationNumber">
                <Translate contentKey="redaApp.student.registrationNumber">Registration Number</Translate>
              </span>
            </dt>
            <dd>{studentEntity.registrationNumber}</dd>
            <dt>
              <span id="firstname">
                <Translate contentKey="redaApp.student.firstname">Firstname</Translate>
              </span>
            </dt>
            <dd>{studentEntity.firstname}</dd>
            <dt>
              <span id="lastname">
                <Translate contentKey="redaApp.student.lastname">Lastname</Translate>
              </span>
            </dt>
            <dd>{studentEntity.lastname}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="redaApp.student.email">Email</Translate>
              </span>
            </dt>
            <dd>{studentEntity.email}</dd>
            <dt>
              <span id="active">
                <Translate contentKey="redaApp.student.active">Active</Translate>
              </span>
            </dt>
            <dd>{studentEntity.active ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="redaApp.student.contactInformation">Contact Information</Translate>
            </dt>
            <dd>{studentEntity.contactInformation ? studentEntity.contactInformation.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/student" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/student/${studentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ student }: IRootState) => ({
  studentEntity: student.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
