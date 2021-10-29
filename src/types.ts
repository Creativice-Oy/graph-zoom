export type PageIteratee<T> = (page: T) => Promise<void>;

export type ZoomUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: number;
  pmi: number;
  timezone: string;
  verified: number;
  created_at: string;
  last_login_time: string;
  last_client_version: string;
  pic_url: string;
  language: string;
  phone_number: string;
  status: string;
  role_id: string;
  dept: string;
  group_ids: string[];
  host_key: string;
};

export type ZoomGroup = {
  id: string;
  name: string;
  total_members: number;
};

export type GroupsResponse = {
  total_records: number;
  groups: ZoomGroup[];
};

export type ZoomGroupMember = Pick<
  ZoomUser,
  'id' | 'first_name' | 'last_name' | 'email' | 'type'
>;

export type ZoomRole = {
  id: string;
  name: string;
  description: string;
  total_members: number;
};

export type RolesResponse = {
  total_records: number;
  roles: ZoomRole[];
};

export type ZoomRoleMember = Pick<
  ZoomUser,
  'id' | 'first_name' | 'last_name' | 'email' | 'type'
> & { department: string };

type PaginationData = {
  next_page_token: string;
  page_count: number;
  page_size: number;
  page_number: number;
  total_records: number;
};

export type PaginatedUsers = {
  users: ZoomUser[];
  PaginationData;
} & PaginationData;

export type PaginatedUserInGroupsResponse = {
  members: ZoomGroupMember[];
} & PaginationData;

export type PaginatedUserInRolesResponse = {
  members: ZoomRoleMember[];
} & PaginationData;
