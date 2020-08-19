import fetchAPI from '../../api';

const isGameExist = (roomId) => fetchAPI(`game/${roomId}`, 'GET');

export { isGameExist };
