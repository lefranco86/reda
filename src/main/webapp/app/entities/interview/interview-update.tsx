import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentOffer } from 'app/shared/model/student-offer.model';
import { getEntities as getStudentOffers } from 'app/entities/student-offer/student-offer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './interview.reducer';
import { IInterview } from 'app/shared/model/interview.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInterviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInterviewUpdateState {
  isNew: boolean;
  studentOfferId: string;
}

export class InterviewUpdate extends React.Component<IInterviewUpdateProps, IInterviewUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentOfferId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStudentOffers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { interviewEntity } = this.props;
      const entity = {
        ...interviewEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/interview');
  };

  render() {
    const { interviewEntity, studentOffers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="redaApp.interview.home.createOrEditLabel">
              <Translate contentKey="redaApp.interview.home.createOrEditLabel">Create or edit a Interview</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : interviewEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="interview-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="redaApp.interview.date">Date</Translate>
                  </Label>
                  <AvField
                    id="interview-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="resultLabel" for="result">
                    <Translate contentKey="redaApp.interview.result">Result</Translate>
                  </Label>
                  <AvField id="interview-result" type="text" name="result" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentOffer.id">
                    <Translate contentKey="redaApp.interview.studentOffer">Student Offer</Translate>
                  </Label>
                  <AvInput id="interview-studentOffer" type="select" className="form-control" name="studentOffer.id">
                    <option value="" key="0" />
                    {studentOffers
                      ? studentOffers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/interview" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  studentOffers: storeState.studentOffer.entities,
  interviewEntity: storeState.interview.entity,
  loading: storeState.interview.loading,
  updating: storeState.interview.updating
});

const mapDispatchToProps = {
  getStudentOffers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewUpdate);
