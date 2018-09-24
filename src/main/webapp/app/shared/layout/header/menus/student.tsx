import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';
import { Translate, translate } from 'react-jhipster';

const studentMenuItems = (
  <>
    <DropdownItem tag={Link} to="/student/user-management">
      <FontAwesomeIcon icon="user" /> <Translate contentKey="global.menu.student.potato">Potato</Translate>
    </DropdownItem>
  </>
);

export const StudentMenu = () => (
  <NavDropdown icon="user-plus" name={translate('global.menu.student.main')} style={{ width: '140%' }} id="admin-menu">
    {studentMenuItems}
  </NavDropdown>
);

export default StudentMenu;
