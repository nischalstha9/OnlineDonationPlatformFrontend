export const parseDate = (isoTime) => {
  return new Date(Date.parse(isoTime)).toDateString();
};
