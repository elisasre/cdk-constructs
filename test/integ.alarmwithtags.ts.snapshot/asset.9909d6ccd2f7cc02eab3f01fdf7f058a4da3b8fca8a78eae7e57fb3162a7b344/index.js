"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/cfn-response/index.js
var require_cfn_response = __commonJS({
  "node_modules/cfn-response/index.js"(exports2) {
    exports2.SUCCESS = "SUCCESS";
    exports2.FAILED = "FAILED";
    exports2.send = function(event, context, responseStatus, responseData, physicalResourceId) {
      var responseBody = JSON.stringify({
        Status: responseStatus,
        Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
        PhysicalResourceId: physicalResourceId || context.logStreamName,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
        Data: responseData
      });
      console.log("Response body:\n", responseBody);
      var https = require("https");
      var url = require("url");
      var parsedUrl = url.parse(event.ResponseURL);
      var options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.path,
        method: "PUT",
        headers: {
          "content-type": "",
          "content-length": responseBody.length
        }
      };
      var request = https.request(options, function(response2) {
        console.log("Status code: " + response2.statusCode);
        console.log("Status message: " + response2.statusMessage);
        context.done();
      });
      request.on("error", function(error) {
        console.log("send(..) failed executing https.request(..): " + error);
        context.done();
      });
      request.write(responseBody);
      request.end();
    };
  }
});

// src/alarmwithtags/alarmwithtags.custom-resource-lambda.ts
var alarmwithtags_custom_resource_lambda_exports = {};
__export(alarmwithtags_custom_resource_lambda_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(alarmwithtags_custom_resource_lambda_exports);
var AWS = __toESM(require("aws-sdk"));
var response = __toESM(require_cfn_response());
var cloudwatch = new AWS.CloudWatch();
var handler = async (event, context) => {
  console.log(event);
  try {
    const tags = event.ResourceProperties.Tags;
    const arn = event.ResourceProperties.AlarmArn;
    if (!tags || !tags.length || !arn) {
      console.error("AlarmArn and Tags properties must be defined");
      await response.send(event, context, response.FAILED, {});
    }
    if (event.RequestType === "Create") {
      await cloudwatch.tagResource({
        ResourceARN: arn,
        Tags: tags
      }).promise();
    } else if (event.RequestType === "Update") {
      const previousTags = event.OldResourceProperties.Tags;
      const currentTagKeys = tags.map((t) => t.Key);
      const staleTags = previousTags.filter((p) => !currentTagKeys.includes(p.Key));
      if (staleTags.length) {
        await cloudwatch.untagResource({
          ResourceARN: arn,
          TagKeys: staleTags.map((t) => t.Key)
        }).promise();
      }
      await cloudwatch.tagResource({
        ResourceARN: arn,
        Tags: tags
      }).promise();
    } else if (event.RequestType === "Delete") {
      await cloudwatch.untagResource({
        ResourceARN: arn,
        TagKeys: tags.map((t) => t.Key)
      }).promise();
    }
    await response.send(event, context, response.SUCCESS, {});
  } catch (error) {
    console.error(error);
    await response.send(event, context, response.FAILED, {});
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
