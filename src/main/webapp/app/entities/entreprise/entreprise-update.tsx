import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContactInformation } from 'app/shared/model/contact-information.model';
import { getEntities as getContactInformations } from 'app/entities/contact-information/contact-information.reducer';
import { getEntity, updateEntity, createEntity, reset } from './entreprise.reducer';
import { IEntreprise } from 'app/shared/model/entreprise.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntrepriseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEntrepriseUpdateState {
  isNew: boolean;
  contactInformationId: string;
}

export class EntrepriseUpdate extends React.Component<IEntrepriseUpdateProps, IEntrepriseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      contactInformationId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getContactInformations();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { entrepriseEntity } = this.props;
      const entity = {
        ...entrepriseEntity,
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
    this.props.history.push('/entity/entreprise');
  };

  render() {
    const { entrepriseEntity, contactInformations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="redaApp.entreprise.home.createOrEditLabel">
              <Translate contentKey="redaApp.entreprise.home.createOrEditLabel">Create or edit a Entreprise</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : entrepriseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="entreprise-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="redaApp.entreprise.name">Name</Translate>
                  </Label>
                  <AvField
                    id="entreprise-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="contactInformation.id">
                    <Translate contentKey="redaApp.entreprise.contactInformation">Contact Information</Translate>
                  </Label>
                  <AvInput id="entreprise-contactInformation" type="select" className="form-control" name="contactInformation.id">
                    <option value="" key="0" />
                    {contactInformations
                      ? contactInformations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/entreprise" replace color="info">
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
  contactInformations: storeState.contactInformation.entities,
  entrepriseEntity: storeState.entreprise.entity,
  loading: storeState.entreprise.loading,
  updating: storeState.entreprise.updating
});

const mapDispatchToProps = {
  getContactInformations,
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
)(EntrepriseUpdate);
