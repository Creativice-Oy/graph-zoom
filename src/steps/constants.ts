import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export enum IntegrationSteps {
  ACCOUNT = 'fetch-account',
  USERS = 'fetch-users',
  GROUPS = 'fetch-groups',
  BUILD_USER_AND_GROUP_RELATIONSHIP = 'build-user-and-group-relationship',
  BUILD_USER_AND_ROLE_RELATIONSHIP = 'build-user-and-role-relationship',
  ROLES = 'fetch-roles',
  USER_SETTINGS = 'fetch-user-settings',
}

export const Entities: Record<
  'ACCOUNT' | 'USER' | 'GROUP' | 'ROLE' | 'USER_SETTINGS',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'zoom_account',
    _class: 'User',
  },
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
  USER_SETTINGS: {
    resourceName: 'User Settings',
    _type: 'zoom_user_settings',
    _class: 'Configuration',
  },
};

export const Relationships: Record<
  'GROUP_HAS_USER' | 'USER_ASSIGNED_ROLE' | 'USER_HAS_USER_SETTINGS',
  StepRelationshipMetadata
> = {
  GROUP_HAS_USER: {
    _type: 'zoom_group_has_user',
    _class: RelationshipClass.HAS,
    sourceType: Entities.GROUP._type,
    targetType: Entities.USER._type,
  },
  USER_ASSIGNED_ROLE: {
    _type: 'zoom_user_assigned_role',
    _class: RelationshipClass.ASSIGNED,
    sourceType: Entities.USER._type,
    targetType: Entities.ROLE._type,
  },
  USER_HAS_USER_SETTINGS: {
    _type: 'zoom_user_has_settings',
    _class: RelationshipClass.HAS,
    sourceType: Entities.USER._type,
    targetType: Entities.USER_SETTINGS._type,
  },
};
