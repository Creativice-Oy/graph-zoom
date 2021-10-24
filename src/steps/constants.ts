import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export enum IntegrationSteps {
  USERS = 'fetch-users',
  GROUPS = 'fetch-groups',
}

export const Entities: Record<'USER' | 'GROUP', StepEntityMetadata> = {
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
};
