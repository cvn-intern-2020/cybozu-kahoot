import fetchAPI from '../common/api';

const getUser = () => fetchAPI('auth/user');

export { getUser };
