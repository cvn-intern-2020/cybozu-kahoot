import fetchAPI from '../../common/api';

const changePassword = (passwords) =>
    fetchAPI('auth/change_password', 'POST', passwords);

export { changePassword };
