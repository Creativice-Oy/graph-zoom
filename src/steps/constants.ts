import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export enum IntegrationSteps {
  USERS = 'fetch-users',
  GROUPS = 'fetch-groups',
  BUILD_USER_AND_GROUP_RELATIONSHIP = 'build-user-and-group-relationship',
  ROLES = 'fetch-roles',
}

export const Entities: Record<'USER' | 'GROUP' | 'ROLE', StepEntityMetadata> = {
  USER: {
    resourceName: 'User',
    _type: 'zoom_user',
    _class: 'User',
  },
  GROUP: {
    resourceName: 'Group',
    _type: 'zoom_group',
    _class: 'Group',
  },
  ROLE: {
    resourceName: 'Role',
    _type: 'zoom_role',
    _class: 'AccessRole',
  },
};

export const Relationships: Record<
  'GROUP_HAS_USER',
  StepRelationshipMetadata
> = {
  GROUP_HAS_USER: {
    _type: 'zoom_group_has_user',
    _class: RelationshipClass.HAS,
    sourceType: Entities.GROUP._type,
    targetType: Entities.USER._type,
  },
};
