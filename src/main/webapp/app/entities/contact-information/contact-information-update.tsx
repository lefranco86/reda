import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudent } from 'app/shared/model/student.model';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { getEntities as getEntreprises } from 'app/entities/entreprise/entreprise.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contact-information.reducer';
import { IContactInformation } from 'app/shared/model/contact-information.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContactInformationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContactInformationUpdateState {
  isNew: boolean;
  studentId: string;
  countryId: string;
  entrepriseId: string;
  employeeId: string;
  teacherId: string;
}

export class ContactInformationUpdate extends React.Component<IContactInformationUpdateProps, IContactInformationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '0',
      countryId: '0',
      entrepriseId: '0',
      employeeId: '0',
      teacherId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStudents();
    this.props.getCountries();
    this.props.getEntreprises();
    this.props.getEmployees();
    this.props.getTeachers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { contactInformationEntity } = this.props;
      const entity = {
        ...contactInformationEntity,
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
    this.props.history.push('/entity/contact-information');
  };

  render() {
    const { contactInformationEntity, students, countries, entreprises, employees, teachers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="redaApp.contactInformation.home.createOrEditLabel">
              <Translate contentKey="redaApp.contactInformation.home.createOrEditLabel">Create or edit a ContactInformation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contactInformationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="contact-information-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="streetLabel" for="street">
                    <Translate contentKey="redaApp.contactInformation.street">Street</Translate>
                  </Label>
                  <AvField
                    id="contact-information-street"
                    type="text"
                    name="street"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="civicNumberLabel" for="civicNumber">
                    <Translate contentKey="redaApp.contactInformation.civicNumber">Civic Number</Translate>
                  </Label>
                  <AvField
                    id="contact-information-civicNumber"
                    type="string"
                    className="form-control"
                    name="civicNumber"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    <Translate contentKey="redaApp.contactInformation.city">City</Translate>
                  </Label>
                  <AvField
                    id="contact-information-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="postalCode">
                    <Translate contentKey="redaApp.contactInformation.postalCode">Postal Code</Translate>
                  </Label>
                  <AvField
                    id="contact-information-postalCode"
                    type="text"
                    name="postalCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="apartmentLabel" for="apartment">
                    <Translate contentKey="redaApp.contactInformation.apartment">Apartment</Translate>
                  </Label>
                  <AvField id="contact-information-apartment" type="text" name="apartment" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="phoneNumber">
                    <Translate contentKey="redaApp.contactInformation.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField
                    id="contact-information-phoneNumber"
                    type="string"
                    className="form-control"
                    name="phoneNumber"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phonePostLabel" for="phonePost">
                    <Translate contentKey="redaApp.contactInformation.phonePost">Phone Post</Translate>
                  </Label>
                  <AvField id="contact-information-phonePost" type="string" className="form-control" name="phonePost" />
                </AvGroup>
                <AvGroup>
                  <Label id="faxNumberLabel" for="faxNumber">
                    <Translate contentKey="redaApp.contactInformation.faxNumber">Fax Number</Translate>
                  </Label>
                  <AvField id="contact-information-faxNumber" type="string" className="form-control" name="faxNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="faxPostLabel" for="faxPost">
                    <Translate contentKey="redaApp.contactInformation.faxPost">Fax Post</Translate>
                  </Label>
                  <AvField id="contact-information-faxPost" type="string" className="form-control" name="faxPost" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/contact-information" replace color="info">
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
  students: storeState.student.entities,
  countries: storeState.country.entities,
  entreprises: storeState.entreprise.entities,
  employees: storeState.employee.entities,
  teachers: storeState.teacher.entities,
  contactInformationEntity: storeState.contactInformation.entity,
  loading: storeState.contactInformation.loading,
  updating: storeState.contactInformation.updating
});

const mapDispatchToProps = {
  getStudents,
  getCountries,
  getEntreprises,
  getEmployees,
  getTeachers,
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
)(ContactInformationUpdate);
