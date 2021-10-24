import fetch, { Response } from 'node-fetch';

import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';
import {
  GroupsResponse,
  PageIteratee,
  PaginatedUsers,
  ZoomGroup,
  ZoomUser,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

export class APIClient {
  constructor(readonly config: IntegrationConfig) {}

  private readonly paginateEntitiesPerPage = 10;

  private withBaseUri(path: string): string {
    return `https://api.zoom.us/v2/${path}`;
  }

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    const response = await fetch(uri, {
      method,
      headers: {
        Authorization: `Bearer ${this.config.zoomAccessToken}`,
      },
    });
    if (!response.ok) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: response.status,
        statusText: response.statusText,
      });
    }
    return response;
  }

  // OAuth scope: 'user:read:admin'
  public async iterateUsers<T>(
    pageIteratee: PageIteratee<ZoomUser>,
  ): Promise<void> {
    let body: PaginatedUsers;
    let nextPageToken = '';
    let nextPageCount = 1;

    do {
      const endpoint = this.withBaseUri(
        `users?page_size=${
          this.paginateEntitiesPerPage
        }&page_number=${nextPageCount}${
          nextPageToken ? `&next_page_token=${nextPageToken}` : ''
        }`,
      );
      const response = await this.request(endpoint, 'GET');

      if (!response.ok) {
        throw new IntegrationProviderAPIError({
          endpoint: '/users',
          status: response.status,
          statusText: response.statusText,
        });
      }

      body = await response.json();

      for (const user of body.users) {
        await pageIteratee(user);
      }

      nextPageToken = body.next_page_token;
      nextPageCount = body.page_count + 1;
    } while (nextPageToken);
  }

  // OAuth scope: 'group:read:admin'
  public async iterateGroups<T>(
    pageIteratee: PageIteratee<ZoomGroup>,
  ): Promise<void> {
    const groupsApiRoute = this.withBaseUri('groups');

    const response = await this.request(groupsApiRoute, 'GET');
    const body: GroupsResponse = await response.json();

    for (const group of body.groups) {
      await pageIteratee(group);
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const usersApiRoute = this.withBaseUri('users/me');
    try {
      await this.request(usersApiRoute, 'GET');
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        endpoint: usersApiRoute,
        status: err.code,
        statusText: err.message,
      });
    }
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
