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
};

export type PaginatedUsers = {
  next_page_token: string;
  page_count: number;
  page_size: number;
  users: ZoomUser[];
};
