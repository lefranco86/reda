import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICohort, defaultValue } from 'app/shared/model/cohort.model';

export const ACTION_TYPES = {
  FETCH_COHORT_LIST: 'cohort/FETCH_COHORT_LIST',
  FETCH_COHORT: 'cohort/FETCH_COHORT',
  CREATE_COHORT: 'cohort/CREATE_COHORT',
  UPDATE_COHORT: 'cohort/UPDATE_COHORT',
  DELETE_COHORT: 'cohort/DELETE_COHORT',
  RESET: 'cohort/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICohort>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CohortState = Readonly<typeof initialState>;

// Reducer

export default (state: CohortState = initialState, action): CohortState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COHORT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COHORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COHORT):
    case REQUEST(ACTION_TYPES.UPDATE_COHORT):
    case REQUEST(ACTION_TYPES.DELETE_COHORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COHORT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COHORT):
    case FAILURE(ACTION_TYPES.CREATE_COHORT):
    case FAILURE(ACTION_TYPES.UPDATE_COHORT):
    case FAILURE(ACTION_TYPES.DELETE_COHORT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COHORT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COHORT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COHORT):
    case SUCCESS(ACTION_TYPES.UPDATE_COHORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COHORT):
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

const apiUrl = 'api/cohorts';

// Actions

export const getEntities: ICrudGetAllAction<ICohort> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COHORT_LIST,
  payload: axios.get<ICohort>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICohort> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COHORT,
    payload: axios.get<ICohort>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICohort> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COHORT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICohort> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COHORT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICohort> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COHORT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
