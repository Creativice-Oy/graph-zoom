import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Entities, IntegrationSteps } from '../constants';
import { createGroupEntity } from './converters';

export async function fetchGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateGroups(async (group) => {
    await jobState.addEntity(createGroupEntity(group));
  });
}

export const groupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.GROUPS,
    name: 'Fetch Groups',
    entities: [Entities.GROUP],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchGroups,
  },
];
