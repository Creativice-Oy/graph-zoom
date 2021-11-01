import { userSteps } from './users';
import { groupSteps } from './groups';
import { roleSteps } from './roles';
import { userSettingsSteps } from './userSettings';

const integrationSteps = [
  ...userSteps,
  ...groupSteps,
  ...roleSteps,
  ...userSettingsSteps,
];

export { integrationSteps };
