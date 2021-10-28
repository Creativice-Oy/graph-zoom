import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../config';
import { createAPIClient } from '../../client';
import { Entities, IntegrationSteps, Relationships } from '../constants';
import { createRoleEntity } from './converters';
import { getUserKey } from '../users/converters';

export async function fetchRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iterateRoles(async (role) => {
    await jobState.addEntity(createRoleEntity(role));
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

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: IntegrationSteps.ROLES,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchRoles,
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
