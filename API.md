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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AlarmWithTags <a name="AlarmWithTags" id="@elisasre/cdk-constructs.AlarmWithTags"></a>

#### Initializers <a name="Initializers" id="@elisasre/cdk-constructs.AlarmWithTags.Initializer"></a>

```typescript
import { AlarmWithTags } from '@elisasre/cdk-constructs'

new AlarmWithTags(scope: Construct, id: string, props: AlarmProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.Initializer.parameter.props">props</a></code> | <code>aws-cdk-lib.aws_cloudwatch.AlarmProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@elisasre/cdk-constructs.AlarmWithTags.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@elisasre/cdk-constructs.AlarmWithTags.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@elisasre/cdk-constructs.AlarmWithTags.Initializer.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.AlarmProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.addAlarmAction">addAlarmAction</a></code> | Trigger this action if the alarm fires. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.addInsufficientDataAction">addInsufficientDataAction</a></code> | Trigger this action if there is insufficient data to evaluate the alarm. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.addOkAction">addOkAction</a></code> | Trigger this action if the alarm returns from breaching state into ok state. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.renderAlarmRule">renderAlarmRule</a></code> | AlarmRule indicating ALARM state for Alarm. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.toAnnotation">toAnnotation</a></code> | Turn this alarm into a horizontal annotation. |

---

##### `toString` <a name="toString" id="@elisasre/cdk-constructs.AlarmWithTags.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@elisasre/cdk-constructs.AlarmWithTags.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@elisasre/cdk-constructs.AlarmWithTags.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addAlarmAction` <a name="addAlarmAction" id="@elisasre/cdk-constructs.AlarmWithTags.addAlarmAction"></a>

```typescript
public addAlarmAction(actions: IAlarmAction): void
```

Trigger this action if the alarm fires.

Typically SnsAcion or AutoScalingAction.

###### `actions`<sup>Required</sup> <a name="actions" id="@elisasre/cdk-constructs.AlarmWithTags.addAlarmAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `addInsufficientDataAction` <a name="addInsufficientDataAction" id="@elisasre/cdk-constructs.AlarmWithTags.addInsufficientDataAction"></a>

```typescript
public addInsufficientDataAction(actions: IAlarmAction): void
```

Trigger this action if there is insufficient data to evaluate the alarm.

Typically SnsAction or AutoScalingAction.

###### `actions`<sup>Required</sup> <a name="actions" id="@elisasre/cdk-constructs.AlarmWithTags.addInsufficientDataAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `addOkAction` <a name="addOkAction" id="@elisasre/cdk-constructs.AlarmWithTags.addOkAction"></a>

```typescript
public addOkAction(actions: IAlarmAction): void
```

Trigger this action if the alarm returns from breaching state into ok state.

Typically SnsAction or AutoScalingAction.

###### `actions`<sup>Required</sup> <a name="actions" id="@elisasre/cdk-constructs.AlarmWithTags.addOkAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `renderAlarmRule` <a name="renderAlarmRule" id="@elisasre/cdk-constructs.AlarmWithTags.renderAlarmRule"></a>

```typescript
public renderAlarmRule(): string
```

AlarmRule indicating ALARM state for Alarm.

##### `toAnnotation` <a name="toAnnotation" id="@elisasre/cdk-constructs.AlarmWithTags.toAnnotation"></a>

```typescript
public toAnnotation(): HorizontalAnnotation
```

Turn this alarm into a horizontal annotation.

This is useful if you want to represent an Alarm in a non-AlarmWidget.
An `AlarmWidget` can directly show an alarm, but it can only show a
single alarm and no other metrics. Instead, you can convert the alarm to
a HorizontalAnnotation and add it as an annotation to another graph.

This might be useful if:

- You want to show multiple alarms inside a single graph, for example if
  you have both a "small margin/long period" alarm as well as a
  "large margin/short period" alarm.

- You want to show an Alarm line in a graph with multiple metrics in it.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.fromAlarmArn">fromAlarmArn</a></code> | Import an existing CloudWatch alarm provided an ARN. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.fromAlarmName">fromAlarmName</a></code> | Import an existing CloudWatch alarm provided an Name. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@elisasre/cdk-constructs.AlarmWithTags.isConstruct"></a>

```typescript
import { AlarmWithTags } from '@elisasre/cdk-constructs'

AlarmWithTags.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@elisasre/cdk-constructs.AlarmWithTags.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@elisasre/cdk-constructs.AlarmWithTags.isOwnedResource"></a>

```typescript
import { AlarmWithTags } from '@elisasre/cdk-constructs'

AlarmWithTags.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@elisasre/cdk-constructs.AlarmWithTags.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@elisasre/cdk-constructs.AlarmWithTags.isResource"></a>

```typescript
import { AlarmWithTags } from '@elisasre/cdk-constructs'

AlarmWithTags.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@elisasre/cdk-constructs.AlarmWithTags.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromAlarmArn` <a name="fromAlarmArn" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmArn"></a>

```typescript
import { AlarmWithTags } from '@elisasre/cdk-constructs'

AlarmWithTags.fromAlarmArn(scope: Construct, id: string, alarmArn: string)
```

Import an existing CloudWatch alarm provided an ARN.

Imported alarms can be tagged, but not modified.

###### `scope`<sup>Required</sup> <a name="scope" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmArn.parameter.alarmArn"></a>

- *Type:* string

Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo).

---

##### `fromAlarmName` <a name="fromAlarmName" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmName"></a>

```typescript
import { AlarmWithTags } from '@elisasre/cdk-constructs'

AlarmWithTags.fromAlarmName(scope: Construct, id: string, alarmName: string)
```

Import an existing CloudWatch alarm provided an Name.

###### `scope`<sup>Required</sup> <a name="scope" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmName.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmName.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `alarmName`<sup>Required</sup> <a name="alarmName" id="@elisasre/cdk-constructs.AlarmWithTags.fromAlarmName.parameter.alarmName"></a>

- *Type:* string

Alarm Name.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.alarmArn">alarmArn</a></code> | <code>string</code> | ARN of this alarm. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.alarmName">alarmName</a></code> | <code>string</code> | Name of this alarm. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IMetric</code> | The metric object this alarm was based on. |
| <code><a href="#@elisasre/cdk-constructs.AlarmWithTags.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@elisasre/cdk-constructs.AlarmWithTags.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@elisasre/cdk-constructs.AlarmWithTags.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@elisasre/cdk-constructs.AlarmWithTags.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="@elisasre/cdk-constructs.AlarmWithTags.property.alarmArn"></a>

```typescript
public readonly alarmArn: string;
```

- *Type:* string

ARN of this alarm.

---

##### `alarmName`<sup>Required</sup> <a name="alarmName" id="@elisasre/cdk-constructs.AlarmWithTags.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string

Name of this alarm.

---

##### `metric`<sup>Required</sup> <a name="metric" id="@elisasre/cdk-constructs.AlarmWithTags.property.metric"></a>

```typescript
public readonly metric: IMetric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IMetric

The metric object this alarm was based on.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@elisasre/cdk-constructs.AlarmWithTags.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

---





