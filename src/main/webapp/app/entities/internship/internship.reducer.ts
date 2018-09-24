import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInternship, defaultValue } from 'app/shared/model/internship.model';

export const ACTION_TYPES = {
  FETCH_INTERNSHIP_LIST: 'internship/FETCH_INTERNSHIP_LIST',
  FETCH_INTERNSHIP: 'internship/FETCH_INTERNSHIP',
  CREATE_INTERNSHIP: 'internship/CREATE_INTERNSHIP',
  UPDATE_INTERNSHIP: 'internship/UPDATE_INTERNSHIP',
  DELETE_INTERNSHIP: 'internship/DELETE_INTERNSHIP',
  RESET: 'internship/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInternship>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InternshipState = Readonly<typeof initialState>;

// Reducer

export default (state: InternshipState = initialState, action): InternshipState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INTERNSHIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INTERNSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INTERNSHIP):
    case REQUEST(ACTION_TYPES.UPDATE_INTERNSHIP):
    case REQUEST(ACTION_TYPES.DELETE_INTERNSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INTERNSHIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INTERNSHIP):
    case FAILURE(ACTION_TYPES.CREATE_INTERNSHIP):
    case FAILURE(ACTION_TYPES.UPDATE_INTERNSHIP):
    case FAILURE(ACTION_TYPES.DELETE_INTERNSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERNSHIP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERNSHIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INTERNSHIP):
    case SUCCESS(ACTION_TYPES.UPDATE_INTERNSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INTERNSHIP):
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

const apiUrl = 'api/internships';

// Actions

export const getEntities: ICrudGetAllAction<IInternship> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INTERNSHIP_LIST,
  payload: axios.get<IInternship>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInternship> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INTERNSHIP,
    payload: axios.get<IInternship>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInternship> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INTERNSHIP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInternship> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INTERNSHIP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInternship> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INTERNSHIP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
