import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, Tags } from 'aws-cdk-lib';
import { Alarm, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { AlarmWithTags } from '../src';

const app = new App();
const stack = new Stack(app, 'IntegrationTestStackForAlarmWithTagsFromAlarmArn');

const alarm = new Alarm(stack, 'AlarmConstruct', {
  metric: new Metric({
    namespace: 'Test',
    metricName: 'TestMetric',
  }),
  threshold: 10,
  evaluationPeriods: 1,
  alarmName: 'TestAlarmForIntegrationTestsFromAlarmArn',
});

const alarmWithTags = AlarmWithTags.fromAlarmArn(stack, 'AlarmWithTagsConstruct', alarm.alarmArn);

Tags.of(alarmWithTags).add('foo', 'bar');

const integ = new IntegTest(app, 'TestAlarmTagsFromAlarmArn', {
  testCases: [stack],
  diffAssets: true,
});

const tags = integ.assertions.awsApiCall('CloudWatch', 'listTagsForResource', {
  ResourceARN: 'arn:aws:cloudwatch:eu-central-1:762212084818:alarm:TestAlarmForIntegrationTestsFromAlarmArn',
});

tags.provider.addToRolePolicy({
  Effect: 'Allow',
  Action: ['cloudwatch:ListTagsForResource'],
  Resource: ['*'],
});

tags.expect(ExpectedResult.objectLike({ Tags: [{ Key: 'foo', Value: 'bar' }] }));
