# shared-function-library


## Purpose

This repository is a public JS repository that holds basic functional logic thats available to use in multiple platforms.

## Installation

`yarn`

-----

## Run tests locally

Run all tests:

`yarn test`

Run tests in a specific test-file:

`yarn test <testName.spec.js>`

-----

## Continuous Delivery Pipelines

### How to work with pipelines
- Pull lastest master-branch, and create a feature-branch
- Use `git push` as a feedback-mechanism with build & tests running in the pipeline
- When ticket is done, bump the version and create a pull request for code review.
- On **merge to master** in github, the Master-pipeline will run and publish the package to npm

### The pipelines(s)
- **Feature-pipeline** runs on all branches as a feedback-mechanism for development
- **Master-pipeline** runs on master-branches and automatically deploys to production

### The pipelines are found here
https://app.circleci.com/pipelines/github/qred/shared-function-library

-----

## npm

[https://www.npmjs.com/package/@qred/shared-component-library](https://www.npmjs.com/package/@qred/shared-component-library)


## Documentation

Component | Explaining
--- | --- 
`makeRequest` | Generic axios request handler, with decoding on both error and success responses.
`makeResponse` | Generic makeResponse function for lambdas that returns statusCode and also JSON.stringfys the body.
`handleError` | Generic handleError function that desctructs and returns the error, if error is undefined, sets status 500 and also return a static error message.  


### Usage - makeRequesttrttt

```
const { makeRequest } require('@qred/shared-component-library')

```

---

### Props

Request Object | 
--- |
 method: 'GET',
 url: 'https://wp.qred.qredson/bank',
 data: { userName: 'qredLife' },

### Example

```
  const response = await makeRequest({
    method: 'GET',
    url: 'https://wp.qred.qredson/bank',
    data: {
        userName: 'qredLife'
        passWord: 'lifeQred'
    }
  })

  Then handle the desctructed response

```
