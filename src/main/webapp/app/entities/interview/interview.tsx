import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './interview.reducer';
import { IInterview } from 'app/shared/model/interview.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInterviewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Interview extends React.Component<IInterviewProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { interviewList, match } = this.props;
    return (
      <div>
        <h2 id="interview-heading">
          <Translate contentKey="redaApp.interview.home.title">Interviews</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="redaApp.interview.home.createLabel">Create new Interview</Translate>
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
                  <Translate contentKey="redaApp.interview.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.interview.result">Result</Translate>
                </th>
                <th>
                  <Translate contentKey="redaApp.interview.studentOffer">Student Offer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {interviewList.map((interview, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${interview.id}`} color="link" size="sm">
                      {interview.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={interview.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{interview.result}</td>
                  <td>
                    {interview.studentOffer ? (
                      <Link to={`student-offer/${interview.studentOffer.id}`}>{interview.studentOffer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${interview.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${interview.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${interview.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ interview }: IRootState) => ({
  interviewList: interview.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interview);
