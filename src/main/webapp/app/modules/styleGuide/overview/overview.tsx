import './overview.scss';
import './hybrid.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Form from './form/form';
import Base from './button/base';
import Large from './button/large';
import Small from './button/small';
import Block from './button/block';
import Active from './button/active';
import Disabled from './button/disabled';
import Outline from 'app/modules/styleGuide/overview/button/outline';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import Highlight from 'react-highlight';

export interface IOverviewProp extends StateProps, DispatchProps {}
export interface IOverviewState {
  activeTab: string;
}

export class Overview extends React.Component<IOverviewProp, IOverviewState> {
  constructor(props) {
    super(props);
    this.state = { activeTab: '1' };
  }

  private toggle = (tab: string) => () => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={this.toggle('1')}>
              Formulaire
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={this.toggle('2')}>
              ButtonStyle
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Form />
          </TabPane>
          <TabPane tabId="2">
            <Base />
            <Outline />
            <Large />
            <Small />
            <Block />
            <Active />
            <Disabled />
          </TabPane>
        </TabContent>
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
)(Overview);
