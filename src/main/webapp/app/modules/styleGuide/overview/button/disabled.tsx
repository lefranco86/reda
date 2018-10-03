import '../hybrid.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Button, Label, FormGroup, Card, CardBody, CardTitle, CardSubtitle, CardFooter } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import Highlight from 'react-highlight';

export class Disabled extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Disabled</CardTitle>
                <CardSubtitle>Button</CardSubtitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col>
                    <div>
                      <Button color="primary" disabled>
                        primary
                      </Button>{' '}
                      <Button color="secondary" disabled>
                        secondary
                      </Button>{' '}
                      <Button color="success" disabled>
                        success
                      </Button>{' '}
                      <Button color="info" disabled>
                        info
                      </Button>{' '}
                      <Button color="warning" disabled>
                        warning
                      </Button>{' '}
                      <Button color="danger" disabled>
                        danger
                      </Button>{' '}
                      <Button color="link" disabled>
                        link
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-muted">Footer</CardFooter>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Disabled</CardTitle>
                <CardSubtitle>TypeScript</CardSubtitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col>
                    <Highlight className={'TypeScript'}>
                      {`<div>
  <Button color="primary" disabled>primary</Button>{' '}
  <Button color="secondary" disabled>secondary</Button>{' '}
  <Button color="success" disabled>success</Button>{' '}
  <Button color="info" disabled>info</Button>{' '}
  <Button color="warning" disabled>warning</Button>{' '}
  <Button color="danger" disabled>danger</Button>{' '}
  <Button color="link" disabled>link</Button>
</div>`}
                    </Highlight>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-muted">Footer</CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Disabled);
