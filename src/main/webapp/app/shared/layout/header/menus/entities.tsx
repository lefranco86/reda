import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.country" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/province">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.province" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/entreprise">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.entreprise" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.employee" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cohort">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.cohort" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.studentOffer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/interview">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.interview" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/internship">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.internship" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/technology">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.technology" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offerType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.country" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/province">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.province" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/entreprise">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.entreprise" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.employee" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cohort">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.cohort" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.studentOffer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/interview">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.interview" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/internship">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.internship" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/technology">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.technology" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offerType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.country" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/province">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.province" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/entreprise">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.entreprise" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.employee" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cohort">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.cohort" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.studentOffer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/interview">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.interview" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/internship">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.internship" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/technology">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.technology" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offerType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.country" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/province">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.province" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/entreprise">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.entreprise" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.employee" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cohort">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.cohort" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.studentOffer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/interview">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.interview" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/internship">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.internship" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/technology">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.technology" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offerType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.country" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/province">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.province" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/entreprise">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.entreprise" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.employee" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cohort">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.cohort" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.studentOffer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/interview">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.interview" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/internship">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.internship" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/technology">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.technology" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offerType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/contact-information">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.contactInformation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/country">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.country" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/province">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.province" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/entreprise">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.entreprise" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.employee" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cohort">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.cohort" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-offer">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.studentOffer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/interview">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.interview" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/internship">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.internship" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.document" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/document-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.documentType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/technology">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.technology" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/offer-type">
      <FontAwesomeIcon icon="asterisk" />
      &nbsp;
      <Translate contentKey="global.menu.entities.offerType" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
