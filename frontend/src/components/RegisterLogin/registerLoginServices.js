import { registerLogin } from '../../common/api';

const authUser = (userData) => registerLogin(userData);

export { authUser };
