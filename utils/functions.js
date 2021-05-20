import moment from 'moment';

export const formatDate = date => moment.unix(date / 1000).format('MM/DD/YYYY');

export const fromNow = data => moment.unix(data / 1000).fromNow();

export const shortify = (text, maxLength = 50) => {
  if (!text) {
    return ``;
  }
  if (text.length <= maxLength) {
    return text;
  }

  return text.substr(0, maxLength) + '...';
};
