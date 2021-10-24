import { userSteps } from './users';
import { groupSteps } from './groups';

const integrationSteps = [...userSteps, ...groupSteps];

export { integrationSteps };
