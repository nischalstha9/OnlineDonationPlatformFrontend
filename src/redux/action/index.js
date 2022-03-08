import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  INSERT_TOKEN,
  INSERT_USER,
  INSERT_ALERT,
  REMOVE_ALERT,
} from "../constants";
export const log_in = () => {
  return {
    type: AUTHENTICATED,
  };
};

export const log_out = () => {
  return {
    type: NOT_AUTHENTICATED,
  };
};

export const insert_token = (token) => {
  return {
    type: INSERT_TOKEN,
    payload: token,
  };
};

export const insert_user = (token) => {
  return {
    type: INSERT_USER,
    payload: token,
  };
};

export const insert_alert = (token) => {
  return {
    type: INSERT_ALERT,
    payload: token,
  };
};

export const remove_alert = (token) => {
  return {
    type: REMOVE_ALERT,
    payload: token,
  };
};
