import loginMiddlware from './login.middleware';

import matchMiddlware, { teamExists } from './match.middleware';

export default loginMiddlware;

export { matchMiddlware, teamExists };
