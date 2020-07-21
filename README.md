# Bounty Hunter Server

This is the server for our intergalactic bounty hunter employer. Different departments use different front end technologies, so we're creating just the server to be consumed by each department's client program.

### Routes

| url | HTTP Verb | function |
|-----|-----------|----------|
| /bounties | GET | Index |
| /bounties/:id | GET | Show |
| /bounties | POST | Create |
| /bounties/:id | PUT | Update |
| /bounties/:id | DELETE | Destroy |

### Schema

| field | type | parameters |
|-------|------|------------|
| name | String | required, min length (1), max length(99) |
| wantedFor | String | required |
| client | String | default('Anonymous') |
| ship | String |  |
| reward | Number | default(1000) |
| hunters | Array |  |
| captured | Boolean | default(false) |
| lastSeen | String |  |


## TO DO

- [x] Create express server
  - [x] import
  - [x] home route
  - [x] listen
- [x] Set up mongoose connection
  - [x] create a models folder
  - [x] create index.js
    - [x] Create mongoose connection
    - [x] Write a console log
  - [x] create bounty.js
    - [x] Make schema
    - [x] export bounty
  - [x] in `models/index.js`, export Bounty
- [x] Create controller
  - [x] Stub out routes
  - [x] require the controller in `index.js`
  - [x] put mongoose functionality into each route