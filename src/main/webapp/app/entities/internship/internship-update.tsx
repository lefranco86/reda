import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInterview } from 'app/shared/model/interview.model';
import { getEntities as getInterviews } from 'app/entities/interview/interview.reducer';
import { getEntity, updateEntity, createEntity, reset } from './internship.reducer';
import { IInternship } from 'app/shared/model/internship.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInternshipUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IInternshipUpdateState {
  isNew: boolean;
  interviewId: string;
}

export class InternshipUpdate extends React.Component<IInternshipUpdateProps, IInternshipUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      interviewId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getInterviews();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { internshipEntity } = this.props;
      const entity = {
        ...internshipEntity,
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
    this.props.history.push('/entity/internship');
  };

  render() {
    const { internshipEntity, interviews, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="redaApp.internship.home.createOrEditLabel">
              <Translate contentKey="redaApp.internship.home.createOrEditLabel">Create or edit a Internship</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : internshipEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="internship-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="hourlyRateLabel" for="hourlyRate">
                    <Translate contentKey="redaApp.internship.hourlyRate">Hourly Rate</Translate>
                  </Label>
                  <AvField id="internship-hourlyRate" type="string" className="form-control" name="hourlyRate" />
                </AvGroup>
                <AvGroup>
                  <Label id="weeklyHourLabel" for="weeklyHour">
                    <Translate contentKey="redaApp.internship.weeklyHour">Weekly Hour</Translate>
                  </Label>
                  <AvField id="internship-weeklyHour" type="string" className="form-control" name="weeklyHour" />
                </AvGroup>
                <AvGroup>
                  <Label id="specialRateLabel" for="specialRate">
                    <Translate contentKey="redaApp.internship.specialRate">Special Rate</Translate>
                  </Label>
                  <AvField id="internship-specialRate" type="string" className="form-control" name="specialRate" />
                </AvGroup>
                <AvGroup>
                  <Label id="startLabel" for="start">
                    <Translate contentKey="redaApp.internship.start">Start</Translate>
                  </Label>
                  <AvField
                    id="internship-start"
                    type="date"
                    className="form-control"
                    name="start"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endLabel" for="end">
                    <Translate contentKey="redaApp.internship.end">End</Translate>
                  </Label>
                  <AvField
                    id="internship-end"
                    type="date"
                    className="form-control"
                    name="end"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="interview.id">
                    <Translate contentKey="redaApp.internship.interview">Interview</Translate>
                  </Label>
                  <AvInput id="internship-interview" type="select" className="form-control" name="interview.id">
                    <option value="" key="0" />
                    {interviews
                      ? interviews.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/internship" replace color="info">
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
  interviews: storeState.interview.entities,
  internshipEntity: storeState.internship.entity,
  loading: storeState.internship.loading,
  updating: storeState.internship.updating
});

const mapDispatchToProps = {
  getInterviews,
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
)(InternshipUpdate);
