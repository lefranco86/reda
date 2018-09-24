import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './internship.reducer';
import { IInternship } from 'app/shared/model/internship.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInternshipProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Internship extends React.Component<IInternshipProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { internshipList, match } = this.props;
    return (
      <div>
        <h2 id="internship-heading">
          <Translate contentKey="redaApp.internship.home.title">Internships</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.internship.home.createLabel">Create new Internship</Translate>
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
                  <Translate contentKey="redaApp.internship.hourlyRate">Hourly Rate</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.internship.weeklyHour">Weekly Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.internship.specialRate">Special Rate</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.internship.start">Start</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.internship.end">End</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.internship.interview">Interview</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {internshipList.map((internship, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${internship.id}`} color="link" size="sm">
                      {internship.id}
                    </Button>
                  </td>
                  <td>{internship.hourlyRate}</td>
                  <td>{internship.weeklyHour}</td>
                  <td>{internship.specialRate}</td>
                  <td>
                    <TextFormat type="date" value={internship.start} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={internship.end} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{internship.interview ? <Link to={`interview/${internship.interview.id}`}>{internship.interview.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${internship.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${internship.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${internship.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ internship }: IRootState) => ({
  internshipList: internship.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Internship);
