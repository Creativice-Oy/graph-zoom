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

export async function buildUserAndRolesRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.ROLE._type },
    async (roleEntity) => {
      const roleId = roleEntity.id;

      await apiClient.iterateUsersInRole(roleId as string, async (user) => {
        const userEntity = await jobState.findEntity(getUserKey(user.id));

        if (userEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.ASSIGNED,
              from: userEntity,
              to: roleEntity,
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
    id: IntegrationSteps.BUILD_USER_AND_ROLE_RELATIONSHIP,
    name: 'Build User and Role Relationship',
    entities: [],
    relationships: [Relationships.USER_ASSIGNED_ROLE],
    dependsOn: [IntegrationSteps.ROLES, IntegrationSteps.USERS],
    executionHandler: buildUserAndRolesRelationship,
  },
];
