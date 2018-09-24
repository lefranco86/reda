import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TeacherDetail extends React.Component<ITeacherDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teacherEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.teacher.detail.title">Teacher</Translate> [<b>{teacherEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="registrationNumber">
                <Translate contentKey="redaApp.teacher.registrationNumber">Registration Number</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.registrationNumber}</dd>
            <dt>
              <span id="lastname">
                <Translate contentKey="redaApp.teacher.lastname">Lastname</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.lastname}</dd>
            <dt>
              <span id="firstname">
                <Translate contentKey="redaApp.teacher.firstname">Firstname</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.firstname}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="redaApp.teacher.email">Email</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.email}</dd>
            <dt>
              <Translate contentKey="redaApp.teacher.contactInformation">Contact Information</Translate>
            </dt>
            <dd>{teacherEntity.contactInformation ? teacherEntity.contactInformation.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/teacher" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/teacher/${teacherEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherEntity: teacher.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetail);
