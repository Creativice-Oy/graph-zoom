import { StepEntityMetadata } from '@jupiterone/integration-sdk-core';

export enum IntegrationSteps {
  USERS = 'fetch-users',
}

export const Entities: Record<'USER', StepEntityMetadata> = {
  USER: {
    resourceName: 'User',
    _type: 'zoom_user',
    _class: 'User',
  },
};
