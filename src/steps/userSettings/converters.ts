import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import { ZoomUserSettings } from '../../types';

export function getUserSettingsKey(id: string): string {
  return `zoom_user_settings:${id}`;
}

export function createUserSettingsEntity(user: Entity, data: ZoomUserSettings) {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.USER_SETTINGS._class,
        _type: Entities.USER_SETTINGS._type,
        _key: getUserSettingsKey(user.id as string),
        name: `${user.username} settings`,
      },
    },
  });
}
