import fetchAPI from '../../api';

const logoutUser = () => fetchAPI('auth/logout');

export { logoutUser };
