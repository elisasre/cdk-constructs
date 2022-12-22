import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { AlarmWithTags } from '../src';

describe('AlarmWithTags construct', () => {

  test('AlarmWithTags constructs the expected CloudWatch resources', () => {
  // Create a new stack for the test
    const stack = new cdk.Stack();


    // Create an instance of the AlarmWithTags construct
    new AlarmWithTags(stack, 'AlarmWithTagsConstruct', {
      metric: new Metric({
        namespace: 'Test',
        metricName: 'TestMetric',
      }),
      threshold: 10,
      evaluationPeriods: 1,
      tags: {
        test: 'test',
      },
    });
    const template = Template.fromStack(stack);
    template.hasResource('AWS::CloudWatch::Alarm', {});
  });
});