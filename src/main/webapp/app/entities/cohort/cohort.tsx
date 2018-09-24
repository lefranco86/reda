import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cohort.reducer';
import { ICohort } from 'app/shared/model/cohort.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICohortProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Cohort extends React.Component<ICohortProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cohortList, match } = this.props;
    return (
      <div>
        <h2 id="cohort-heading">
          <Translate contentKey="redaApp.cohort.home.title">Cohorts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.cohort.home.createLabel">Create new Cohort</Translate>
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
                  <Translate contentKey="redaApp.cohort.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.cohort.teacher">Teacher</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.cohort.student">Student</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cohortList.map((cohort, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cohort.id}`} color="link" size="sm">
                      {cohort.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={cohort.startDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{cohort.teacher ? <Link to={`teacher/${cohort.teacher.id}`}>{cohort.teacher.id}</Link> : ''}</td>
                  <td>{cohort.student ? <Link to={`student/${cohort.student.id}`}>{cohort.student.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cohort.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cohort.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cohort.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ cohort }: IRootState) => ({
  cohortList: cohort.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cohort);
