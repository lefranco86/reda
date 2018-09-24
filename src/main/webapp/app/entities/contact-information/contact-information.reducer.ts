import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContactInformation, defaultValue } from 'app/shared/model/contact-information.model';

export const ACTION_TYPES = {
  FETCH_CONTACTINFORMATION_LIST: 'contactInformation/FETCH_CONTACTINFORMATION_LIST',
  FETCH_CONTACTINFORMATION: 'contactInformation/FETCH_CONTACTINFORMATION',
  CREATE_CONTACTINFORMATION: 'contactInformation/CREATE_CONTACTINFORMATION',
  UPDATE_CONTACTINFORMATION: 'contactInformation/UPDATE_CONTACTINFORMATION',
  DELETE_CONTACTINFORMATION: 'contactInformation/DELETE_CONTACTINFORMATION',
  RESET: 'contactInformation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContactInformation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContactInformationState = Readonly<typeof initialState>;

// Reducer

export default (state: ContactInformationState = initialState, action): ContactInformationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTACTINFORMATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTACTINFORMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTACTINFORMATION):
    case REQUEST(ACTION_TYPES.UPDATE_CONTACTINFORMATION):
    case REQUEST(ACTION_TYPES.DELETE_CONTACTINFORMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTACTINFORMATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTACTINFORMATION):
    case FAILURE(ACTION_TYPES.CREATE_CONTACTINFORMATION):
    case FAILURE(ACTION_TYPES.UPDATE_CONTACTINFORMATION):
    case FAILURE(ACTION_TYPES.DELETE_CONTACTINFORMATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTACTINFORMATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTACTINFORMATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTACTINFORMATION):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTACTINFORMATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTACTINFORMATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/contact-informations';

// Actions

export const getEntities: ICrudGetAllAction<IContactInformation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTACTINFORMATION_LIST,
  payload: axios.get<IContactInformation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContactInformation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTACTINFORMATION,
    payload: axios.get<IContactInformation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContactInformation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTACTINFORMATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContactInformation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTACTINFORMATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContactInformation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTACTINFORMATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
