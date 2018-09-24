import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOfferType, defaultValue } from 'app/shared/model/offer-type.model';

export const ACTION_TYPES = {
  FETCH_OFFERTYPE_LIST: 'offerType/FETCH_OFFERTYPE_LIST',
  FETCH_OFFERTYPE: 'offerType/FETCH_OFFERTYPE',
  CREATE_OFFERTYPE: 'offerType/CREATE_OFFERTYPE',
  UPDATE_OFFERTYPE: 'offerType/UPDATE_OFFERTYPE',
  DELETE_OFFERTYPE: 'offerType/DELETE_OFFERTYPE',
  RESET: 'offerType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOfferType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type OfferTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: OfferTypeState = initialState, action): OfferTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OFFERTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OFFERTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OFFERTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_OFFERTYPE):
    case REQUEST(ACTION_TYPES.DELETE_OFFERTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OFFERTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OFFERTYPE):
    case FAILURE(ACTION_TYPES.CREATE_OFFERTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_OFFERTYPE):
    case FAILURE(ACTION_TYPES.DELETE_OFFERTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OFFERTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_OFFERTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OFFERTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_OFFERTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OFFERTYPE):
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

const apiUrl = 'api/offer-types';

// Actions

export const getEntities: ICrudGetAllAction<IOfferType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OFFERTYPE_LIST,
  payload: axios.get<IOfferType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IOfferType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OFFERTYPE,
    payload: axios.get<IOfferType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOfferType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OFFERTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOfferType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OFFERTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOfferType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OFFERTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
