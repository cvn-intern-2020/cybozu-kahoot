import fetchAPI from '../../common/api';

const logoutUser = () => fetchAPI('auth/logout');

export { logoutUser };
