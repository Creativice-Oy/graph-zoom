import {
  createMockStepExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { IntegrationConfig } from '../../config';
import { fetchUsers } from '.';
import { integrationConfig } from '../../../test/config';
import { setupZoomRecording } from '../../../test/recording';

describe('#fetchUsers', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'fetchUsers',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchUsers(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
    }).toMatchSnapshot();

    const users = context.jobState.collectedEntities.filter((e) =>
      e._class.includes('User'),
    );
    expect(users.length).toBeGreaterThan(0);
    expect(users).toMatchGraphObjectSchema({
      _class: ['User'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_user' },
          name: { type: 'string' },
        },
      },
    });
  });
});
