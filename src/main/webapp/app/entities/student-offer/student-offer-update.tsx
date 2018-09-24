import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOffer } from 'app/shared/model/offer.model';
import { getEntities as getOffers } from 'app/entities/offer/offer.reducer';
import { IStudent } from 'app/shared/model/student.model';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { getEntity, updateEntity, createEntity, reset } from './student-offer.reducer';
import { IStudentOffer } from 'app/shared/model/student-offer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStudentOfferUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStudentOfferUpdateState {
  isNew: boolean;
  offerId: string;
  studentId: string;
}

export class StudentOfferUpdate extends React.Component<IStudentOfferUpdateProps, IStudentOfferUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '0',
      studentId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getOffers();
    this.props.getStudents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { studentOfferEntity } = this.props;
      const entity = {
        ...studentOfferEntity,
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
    this.props.history.push('/entity/student-offer');
  };

  render() {
    const { studentOfferEntity, offers, students, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="redaApp.studentOffer.home.createOrEditLabel">
              <Translate contentKey="redaApp.studentOffer.home.createOrEditLabel">Create or edit a StudentOffer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : studentOfferEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="student-offer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="redaApp.studentOffer.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="student-offer-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && studentOfferEntity.status) || 'PENDING'}
                  >
                    <option value="PENDING">
                      <Translate contentKey="redaApp.StudentOfferStatus.PENDING" />
                    </option>
                    <option value="ACCEPTED">
                      <Translate contentKey="redaApp.StudentOfferStatus.ACCEPTED" />
                    </option>
                    <option value="REFUSED">
                      <Translate contentKey="redaApp.StudentOfferStatus.REFUSED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="offer.id">
                    <Translate contentKey="redaApp.studentOffer.offer">Offer</Translate>
                  </Label>
                  <AvInput id="student-offer-offer" type="select" className="form-control" name="offer.id">
                    <option value="" key="0" />
                    {offers
                      ? offers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="student.id">
                    <Translate contentKey="redaApp.studentOffer.student">Student</Translate>
                  </Label>
                  <AvInput id="student-offer-student" type="select" className="form-control" name="student.id">
                    <option value="" key="0" />
                    {students
                      ? students.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/student-offer" replace color="info">
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
  offers: storeState.offer.entities,
  students: storeState.student.entities,
  studentOfferEntity: storeState.studentOffer.entity,
  loading: storeState.studentOffer.loading,
  updating: storeState.studentOffer.updating
});

const mapDispatchToProps = {
  getOffers,
  getStudents,
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
)(StudentOfferUpdate);
