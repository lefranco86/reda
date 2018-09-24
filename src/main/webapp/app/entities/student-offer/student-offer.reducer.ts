import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStudentOffer, defaultValue } from 'app/shared/model/student-offer.model';

export const ACTION_TYPES = {
  FETCH_STUDENTOFFER_LIST: 'studentOffer/FETCH_STUDENTOFFER_LIST',
  FETCH_STUDENTOFFER: 'studentOffer/FETCH_STUDENTOFFER',
  CREATE_STUDENTOFFER: 'studentOffer/CREATE_STUDENTOFFER',
  UPDATE_STUDENTOFFER: 'studentOffer/UPDATE_STUDENTOFFER',
  DELETE_STUDENTOFFER: 'studentOffer/DELETE_STUDENTOFFER',
  RESET: 'studentOffer/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStudentOffer>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StudentOfferState = Readonly<typeof initialState>;

// Reducer

export default (state: StudentOfferState = initialState, action): StudentOfferState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUDENTOFFER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUDENTOFFER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUDENTOFFER):
    case REQUEST(ACTION_TYPES.UPDATE_STUDENTOFFER):
    case REQUEST(ACTION_TYPES.DELETE_STUDENTOFFER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUDENTOFFER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUDENTOFFER):
    case FAILURE(ACTION_TYPES.CREATE_STUDENTOFFER):
    case FAILURE(ACTION_TYPES.UPDATE_STUDENTOFFER):
    case FAILURE(ACTION_TYPES.DELETE_STUDENTOFFER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTOFFER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTOFFER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUDENTOFFER):
    case SUCCESS(ACTION_TYPES.UPDATE_STUDENTOFFER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUDENTOFFER):
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

const apiUrl = 'api/student-offers';

// Actions

export const getEntities: ICrudGetAllAction<IStudentOffer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STUDENTOFFER_LIST,
  payload: axios.get<IStudentOffer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStudentOffer> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTOFFER,
    payload: axios.get<IStudentOffer>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStudentOffer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUDENTOFFER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStudentOffer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUDENTOFFER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStudentOffer> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUDENTOFFER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
