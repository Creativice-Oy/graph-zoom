import { getMockGroup } from '../../../test/mocks';
import { createGroupEntity } from './converters';

describe('#createUserEntity', () => {
  test('should convert to entity', () => {
    expect(createGroupEntity(getMockGroup())).toMatchSnapshot();
  });
});
