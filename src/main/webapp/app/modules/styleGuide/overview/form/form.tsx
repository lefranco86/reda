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

export class Form extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Formulaire</CardTitle>
                <CardSubtitle>Aspect</CardSubtitle>
              </CardBody>
              D
              <CardBody>
                <Row>
                  <Col>
                    <AvForm>
                      {/* With AvField */}
                      <AvField name="name" label="Name" required />
                      {/* With AvGroup AvInput and AvFeedback to build your own */}
                      <AvGroup>
                        <Label for="example">Rank</Label>
                        <AvInput name="rank" id="example" required />
                        <AvFeedback>This is an error!</AvFeedback>
                      </AvGroup>
                      {/* Radios */}
                      <AvRadioGroup name="radioExample" label="Radio Buttons!" required errorMessage="Pick one!">
                        <AvRadio label="Bulbasaur" value="Bulbasaur" />
                        <AvRadio label="Squirtle" value="Squirtle" />
                        <AvRadio label="Charmander" value="Charmander" />
                        <AvRadio label="Pikachu" value="Pikachu" disabled />
                      </AvRadioGroup>

                      <AvRadioGroup inline name="radioExample2" label="Radio Buttons! (inline)" required>
                        <AvRadio label="Bulbasaur" value="Bulbasaur" />
                        <AvRadio label="Squirtle" value="Squirtle" />
                        <AvRadio label="Charmander" value="Charmander" />
                        <AvRadio label="Pikachu" value="Pikachu" disabled />
                      </AvRadioGroup>
                      {/* With select and AvField */}
                      <AvField type="select" name="select" label="Option" helpMessage="Idk, this is an example. Deal with it!">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </AvField>

                      <AvField type="select" name="select-multiple" label="Option" helpMessage="MULTIPLE!" multiple>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </AvField>
                      <FormGroup>
                        <Button>Submit</Button>
                      </FormGroup>
                    </AvForm>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-muted">Footer</CardFooter>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Formulaire</CardTitle>
                <CardSubtitle>TypeScript</CardSubtitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col>
                    <Highlight className={'TypeScript'}>
                      {`<Card>
  <CardBody>
    <CardTitle>Card title</CardTitle>
    <CardSubtitle>test</CardSubtitle>
  </CardBody>
  <CardBody>
    <Row>
      <Col>
        <AvForm>
          {/* With AvField */}
          <AvField name="name" label="Name" required />
          {/* With AvGroup AvInput and AvFeedback to build your own */}
          <AvGroup>
            <Label for="example">Rank</Label>
            <AvInput name="rank" id="example" required />
            <AvFeedback>This is an error!</AvFeedback>
          </AvGroup>
          {/* Radios */}
          <AvRadioGroup name="radioExample" label="Radio Buttons!" required errorMessage="Pick one!">
            <AvRadio label="Bulbasaur" value="Bulbasaur" />
            <AvRadio label="Squirtle" value="Squirtle" />
            <AvRadio label="Charmander" value="Charmander" />
            <AvRadio label="Pikachu" value="Pikachu" disabled />
          </AvRadioGroup>
          <AvRadioGroup inline name="radioExample2" label="Radio Buttons! (inline)" required>
            <AvRadio label="Bulbasaur" value="Bulbasaur" />
            <AvRadio label="Squirtle" value="Squirtle" />
            <AvRadio label="Charmander" value="Charmander" />
            <AvRadio label="Pikachu" value="Pikachu" disabled />
          </AvRadioGroup>
          {/* With select and AvField */}
          <AvField type="select" name="select" label="Option" helpMessage="Idk, this is an example. Deal with it!">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </AvField>
          <AvField type="select" name="select-multiple" label="Option" helpMessage="MULTIPLE!" multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </AvField>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </AvForm>
      </Col>
    </Row>
  </CardBody>
  <CardFooter className="text-muted">Footer</CardFooter>
</Card>`}
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
)(Form);
