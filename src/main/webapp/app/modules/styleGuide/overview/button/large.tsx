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

export class Large extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Large</CardTitle>
                <CardSubtitle>Button</CardSubtitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col>
                    <div>
                      <Button color="primary" size="lg">
                        Large primary
                      </Button>{' '}
                      <Button color="secondary" size="lg">
                        Large secondary
                      </Button>{' '}
                      <Button color="success" size="lg">
                        Large success
                      </Button>{' '}
                      <Button color="info" size="lg">
                        Large info
                      </Button>{' '}
                      <Button color="warning" size="lg">
                        Large warning
                      </Button>{' '}
                      <Button color="danger" size="lg">
                        Large danger
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
                <CardTitle>Large</CardTitle>
                <CardSubtitle>TypeScript</CardSubtitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col>
                    <Highlight className={'TypeScript'}>
                      {`<Col>
  <div>
    <Button color="primary" size="lg">Large primary</Button>{' '}
    <Button color="secondary" size="lg">Large secondary</Button>{' '}
    <Button color="success" size="lg">Large success</Button>{' '}
    <Button color="info" size="lg">Large info</Button>{' '}
    <Button color="warning" size="lg">Large warning</Button>{' '}
    <Button color="danger" size="lg">Large danger</Button>
  </div>
</Col>`}
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
)(Large);
