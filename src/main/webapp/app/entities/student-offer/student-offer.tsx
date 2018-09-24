import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './student-offer.reducer';
import { IStudentOffer } from 'app/shared/model/student-offer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentOfferProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class StudentOffer extends React.Component<IStudentOfferProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { studentOfferList, match } = this.props;
    return (
      <div>
        <h2 id="student-offer-heading">
          <Translate contentKey="redaApp.studentOffer.home.title">Student Offers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.studentOffer.home.createLabel">Create new Student Offer</Translate>
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
                  <Translate contentKey="redaApp.studentOffer.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.studentOffer.offer">Offer</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.studentOffer.student">Student</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {studentOfferList.map((studentOffer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${studentOffer.id}`} color="link" size="sm">
                      {studentOffer.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`redaApp.StudentOfferStatus.${studentOffer.status}`} />
                  </td>
                  <td>{studentOffer.offer ? <Link to={`offer/${studentOffer.offer.id}`}>{studentOffer.offer.id}</Link> : ''}</td>
                  <td>{studentOffer.student ? <Link to={`student/${studentOffer.student.id}`}>{studentOffer.student.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${studentOffer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${studentOffer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${studentOffer.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ studentOffer }: IRootState) => ({
  studentOfferList: studentOffer.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentOffer);
