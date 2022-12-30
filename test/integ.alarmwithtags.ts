import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack } from 'aws-cdk-lib';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { AlarmWithTags } from '../src';

const app = new App();
const stack = new Stack(app, 'IntegrationTestStack');

new AlarmWithTags(stack, 'AlarmWithTagsConstruct', {
  metric: new Metric({
    namespace: 'Test',
    metricName: 'TestMetric',
  }),
  threshold: 10,
  evaluationPeriods: 1,
  alarmName: 'TestAlarmForIntegrationTests',
  tags: {
    foo: 'bar',
  },
});

const integ = new IntegTest(app, 'TestAlarmTags', {
  testCases: [stack],
  diffAssets: true,
});

const tags = integ.assertions.awsApiCall('CloudWatch', 'listTagsForResource', {
  ResourceARN: 'arn:aws:cloudwatch:eu-central-1:762212084818:alarm:TestAlarmForIntegrationTests',
});

tags.provider.addToRolePolicy({
  Effect: 'Allow',
  Action: ['cloudwatch:ListTagsForResource'],
  Resource: ['*'],
});

tags.expect(ExpectedResult.objectLike({ Tags: [{ Key: 'foo', Value: 'bar' }] }));
