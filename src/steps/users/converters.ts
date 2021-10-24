import { createIntegrationEntity } from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomUser } from '../../types';

export function getUserKey(id: string): string {
  return `zoom_user:${id}`;
}

export function createUserEntity(data: ZoomUser) {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.USER._class,
        _type: Entities.USER._type,
        _key: getUserKey(data.id),
        username: data.email,
        name: `${data.first_name} ${data.last_name}`,
      },
    },
  });
}
