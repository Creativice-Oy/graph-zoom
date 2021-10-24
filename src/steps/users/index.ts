import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Entities, IntegrationSteps } from '../constants';
import { createUserEntity } from './converters';

export async function fetchUsers({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateUsers('users', async (user) => {
    await jobState.addEntity(createUserEntity(user));
  });
}

export const userSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.USERS,
    name: 'Fetch Users',
    entities: [Entities.USER],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchUsers,
  },
];
