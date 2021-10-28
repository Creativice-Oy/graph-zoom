import { ZoomGroup, ZoomRole, ZoomUser } from '../src/types';

export function getMockUser(partial?: Partial<ZoomUser>): ZoomUser {
  return {
    id: 'sample-id',
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@email.com',
    type: 1,
    pmi: 111,
    timezone: '',
    verified: 1,
    created_at: '2000-01-23T11:23:52Z',
    last_login_time: '2000-10-24T01:31:01Z',
    last_client_version: '5.7.1.543(win)',
    pic_url: 'https://sample.url',
    language: 'en-US',
    phone_number: '',
    status: 'active',
    role_id: '0',
    dept: 'sample-dept',
    group_ids: ['1', '2'],
    host_key: 'sample-host-key',
    ...partial,
  };
}

export function getMockGroup(partial?: Partial<ZoomGroup>): ZoomGroup {
  return {
    id: 'sample-id',
    name: 'group-name',
    total_members: 420,
    ...partial,
  };
}

export function getMockRole(partial?: Partial<ZoomRole>): ZoomRole {
  return {
    id: 'sample-id',
    name: 'group-name',
    total_members: 420,
    description: 'sample-description',
    ...partial,
  };
}
