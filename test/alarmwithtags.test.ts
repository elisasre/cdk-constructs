import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Alarm, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { AlarmWithTags } from '../src';

describe('AlarmWithTags construct', () => {

  test('AlarmWithTags constructs the expected CloudWatch resources', () => {
  // Create a new stack for the test
    const stack = new cdk.Stack();

    // Create an instance of the AlarmWithTags construct
    const alarm = new AlarmWithTags(stack, 'AlarmWithTagsConstruct', {
      metric: new Metric({
        namespace: 'Test',
        metricName: 'TestMetric',
      }),
      threshold: 10,
      evaluationPeriods: 1,
    });

    Tags.of(alarm).add('test', 'test');

    const template = Template.fromStack(stack);
    template.hasResource('AWS::CloudWatch::Alarm', {});
    template.hasResource('AWS::CloudFormation::CustomResource', {
      Properties: {
        Tags: [
          {
            Key: 'test',
            Value: 'test',
          },
        ],
      },
    });
  });

  test('AlarmWithTags using fromAlarmArn', () => {
  // Create a new stack for the test
    const stack = new cdk.Stack();

    // Create an instance of the Alarm construct
    const alarm = new Alarm(stack, 'AlarmConstruct', {
      metric: new Metric({
        namespace: 'Test',
        metricName: 'TestMetric',
      }),
      threshold: 10,
      evaluationPeriods: 1,
    });

    // Create an instance of the AlarmWithTags construct
    const taggedAlarm = AlarmWithTags.fromAlarmArn(stack, 'AlarmWithTagsConstruct', alarm.alarmArn);
    Tags.of(taggedAlarm).add('test', 'test');

    const template = Template.fromStack(stack);
    template.hasResource('AWS::CloudWatch::Alarm', {});
    template.hasResource('AWS::CloudFormation::CustomResource', {
      Properties: {
        Tags: [
          {
            Key: 'test',
            Value: 'test',
          },
        ],
      },
    });
  });
});