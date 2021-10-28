import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Entities, IntegrationSteps, Relationships } from '../constants';
import { createGroupEntity } from './converters';
import { getUserKey } from '../users/converters';

export async function fetchGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateGroups(async (group) => {
    console.log('group', group);
    await jobState.addEntity(createGroupEntity(group));
  });
}

export async function buildUserAndGroupsRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.GROUP._type },
    async (groupEntity) => {
      const groupId = groupEntity.id;

      await apiClient.iterateUsersInGroup(groupId as string, async (user) => {
        const userEntity = await jobState.findEntity(getUserKey(user.id));

        if (userEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: groupEntity,
              to: userEntity,
            }),
          );
        }
      });
    },
  );
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
  {
    id: IntegrationSteps.BUILD_USER_AND_GROUP_RELATIONSHIP,
    name: 'Build User and Group Relationship',
    entities: [],
    relationships: [Relationships.GROUP_HAS_USER],
    dependsOn: [IntegrationSteps.GROUPS, IntegrationSteps.USERS],
    executionHandler: buildUserAndGroupsRelationship,
  },
];
