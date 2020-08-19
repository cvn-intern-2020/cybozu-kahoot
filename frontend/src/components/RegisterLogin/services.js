import fetchAPI from '../../common/api';

const authUser = (userData) =>
    fetchAPI('auth/register_login', 'POST', userData);

export { authUser };
