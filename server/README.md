# Service

## Databse Schema

[![tables](../diagrams/schema.png "tables")](../diagrams/schema.png "tables")

## HTTP Requests

Base routes for http requests


`<http | https>://<host>/api/**`

### Login

```http
POST /user/login
```

#### Role

- Not required

#### Headers

```json

{
  "Content-Type": "application/json"
}
```

#### Body

```json

{
	"username":"string",
	"password":"string"
}
```

#### Response

```json
{
	"jwt": "string"
}
```

### Sign up

```http
POST /user/register
```

#### Role

- Not required

#### Body

```json
{
"username":"string",
"password":"string",
"nickname":"string"
}
```

#### Response

```json
{
  "jwt": "string"
}
```