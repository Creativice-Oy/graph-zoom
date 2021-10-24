import {
  createMockStepExecutionContext,
  Recording,
} from '@jupiterone/integration-sdk-testing';
import { IntegrationConfig } from '../../config';
import { fetchGroups } from '.';
import { integrationConfig } from '../../../test/config';
import { setupZoomRecording } from '../../../test/recording';

describe('#fetchGroups', () => {
  let recording: Recording;

  beforeEach(() => {
    recording = setupZoomRecording({
      directory: __dirname,
      name: 'fetchGroups',
    });
  });

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    const context = createMockStepExecutionContext<IntegrationConfig>({
      instanceConfig: integrationConfig,
    });

    await fetchGroups(context);

    expect({
      numCollectedEntities: context.jobState.collectedEntities.length,
      collectedEntities: context.jobState.collectedEntities,
      encounteredTypes: context.jobState.encounteredTypes,
    }).toMatchSnapshot();

    const users = context.jobState.collectedEntities.filter((e) =>
      e._class.includes('Group'),
    );
    expect(users.length).toBeGreaterThan(0);
    expect(users).toMatchGraphObjectSchema({
      _class: ['Group'],
      schema: {
        additionalProperties: false,
        properties: {
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
          _type: { const: 'zoom_group' },
          id: { type: 'string' },
          name: { type: 'string' },
          totalMembers: { type: 'number' },
        },
      },
    });
  });
});
