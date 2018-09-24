import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './technology.reducer';
import { ITechnology } from 'app/shared/model/technology.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITechnologyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TechnologyDetail extends React.Component<ITechnologyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { technologyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="redaApp.technology.detail.title">Technology</Translate> [<b>{technologyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="redaApp.technology.name">Name</Translate>
              </span>
            </dt>
            <dd>{technologyEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="redaApp.technology.description">Description</Translate>
              </span>
            </dt>
            <dd>{technologyEntity.description}</dd>
            <dt>
              <Translate contentKey="redaApp.technology.offer">Offer</Translate>
            </dt>
            <dd>{technologyEntity.offer ? technologyEntity.offer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/technology" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/technology/${technologyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ technology }: IRootState) => ({
  technologyEntity: technology.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TechnologyDetail);
