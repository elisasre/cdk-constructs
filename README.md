# Constructs for AWS CDK

## Usage

Add @elisasre/cdk-constructs as a dependency of your CDK project and import the desired construct.

## Alarm with tags

Alarm with tags extends the [standard CDK alarm construct](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudwatch.Alarm.html) by allowing tagging of alarms, which Cloudformation does not currently support out of the box.

### Creating a tagged alarm

    declare const fn: lambda.Function;

    const minuteErrorRate = fn.metricErrors({
      statistic: cloudwatch.Stats.AVERAGE,
      period: Duration.minutes(1),
      label: 'Lambda failure rate'
    });

    const alarm = new AlarmWithTags(this, 'myalarm', {
        evaluationPeriods: 3,
        metric: minuteErrorRate,
        threshold: 1,
        comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    });

    Tags.of(alarm).add('foo', 'bar');

### Tagging an existing alarm

    declare const fn: lambda.Function;

    const minuteErrorRate = fn.metricErrors({
      statistic: cloudwatch.Stats.AVERAGE,
      period: Duration.minutes(1),
      label: 'Lambda failure rate'
    });

    const alarm = minuteErrorRate.createAlarm(this, 'myalarm', {
        evaluationPeriods: 3,
        threshold: 1,
        comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    });

    const myTaggedAlarm = AlarmWithTags.fromArn(this, 'myalarmwithtags', alarm.alarmArn);

    Tags.of(myTaggedAlarm).add('foo', 'bar');


[API reference](API.md)
