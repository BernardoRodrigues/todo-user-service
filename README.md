## POST service/user/signup

Creates a new user

Request body:

```json
{
  "email": "example@gmail.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:

* HTTP code 201

```json
{ 
	"id": "54fdf009-0270-461a-beeb-89d57ed3bc42",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0YWZkODhiLTk5MWItNDk2NS1iMmM5LTk2ZTRjMmZjNThkZSJ9.He07nMDw6wYsqWknGzm-O2ykDuighPwhC6AdfIavs-w"
 }
```

* HTTP code 400 

```json
{ "message": "An account is alreay linked to this email address" }
```

* HTTP code 400 

```json
{ "message": "$$name$$ cannot be null" }
```

* HTTP code 500

```json
{ "message": "Server error" }
```


## POST service/user/login

Logs user in

Request body:

```json
{
    "email": "example@gmail.com",
    "password": "password"
}
```

Response:

* HTTP code 200

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0YWZkODhiLTk5MWItNDk2NS1iMmM5LTk2ZTRjMmZjNThkZSJ9.He07nMDw6wYsqWknGzm-O2ykDuighPwhC6AdfIavs-w",
    "email": "example@gmail.com",
    "firstName": "Bernardo",
    "lastName": "Rodrigues",
    "id": "54fdf009-0270-461a-beeb-89d57ed3bc42"
}
```

* HTTP code 400

```json
{
	"message": "Bad Login"
}
```

* HTTP code 500

```json
{ "message": "Server error" }
```

## POST service/user/logout

Logs user out

### Request Headers
	* Authorization: Bearer token

Response:

* HTTP code 405

```json
{
	"message": "Unauthorized"
}
```

* HTTP code 200

```json
{  }
```

## DELETE service/user/

Deletes user account

### Request Headers
	* Authorization: Bearer token

Response:

* HTTP code 200

```json
{}
```

* HTTP code 400

## GET service/user/verify-jwt

Verifies user JWT and returns the user id.

### Query Parameters
	* token

Response: 

* HTTP code 200

```json
{
	"id": "54fdf009-0270-461a-beeb-89d57ed3bc42"
}
```

* HTTP code 400

```json
{}
```
