import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  zoomAccessToken: {
    type: 'string',
    mask: true,
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The OAuth token used to authenticate requests.
   */
  zoomAccessToken: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.zoomAccessToken) {
    throw new IntegrationValidationError(
      'Config requires zoom access token. Please generate from OAuth server.',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
