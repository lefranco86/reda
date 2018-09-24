import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Employee extends React.Component<IEmployeeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { employeeList, match } = this.props;
    return (
      <div>
        <h2 id="employee-heading">
          <Translate contentKey="redaApp.employee.home.title">Employees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.employee.home.createLabel">Create new Employee</Translate>
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
                  <Translate contentKey="redaApp.employee.lastname">Lastname</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.employee.firstname">Firstname</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.employee.job">Job</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.employee.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.employee.contactInformation">Contact Information</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.employee.entreprise">Entreprise</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                      {employee.id}
                    </Button>
                  </td>
                  <td>{employee.lastname}</td>
                  <td>{employee.firstname}</td>
                  <td>{employee.job}</td>
                  <td>{employee.email}</td>
                  <td>
                    {employee.contactInformation ? (
                      <Link to={`contact-information/${employee.contactInformation.id}`}>{employee.contactInformation.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{employee.entreprise ? <Link to={`entreprise/${employee.entreprise.id}`}>{employee.entreprise.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeList: employee.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee);
