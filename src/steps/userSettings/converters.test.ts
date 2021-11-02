import { Entity } from '@jupiterone/integration-sdk-core';
import { getMockUserSettings } from '../../../test/mocks';
import { createUserSettingsEntity } from './converters';

describe('#createUserSettingsEntity', () => {
  test('should convert to entity', () => {
    expect(
      createUserSettingsEntity(
        { id: 'test-id' } as Entity,
        getMockUserSettings(),
      ),
    ).toMatchSnapshot();
  });
});
