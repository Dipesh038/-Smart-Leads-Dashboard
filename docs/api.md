# Smart Leads Dashboard API

Base URL: `/api`

All lead routes require:

```text
Authorization: Bearer <token>
```

## Response Format

Successful JSON responses use this shape:

```json
{
  "success": true,
  "data": {}
}
```

List responses also include:

```json
{
  "meta": {
    "totalRecords": 0,
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

Error responses use this shape:

```json
{
  "success": false,
  "message": "Validation failed"
}
```

## Roles

| Route | Admin | Sales |
| --- | --- | --- |
| `POST /auth/register` | Yes | Yes |
| `POST /auth/login` | Yes | Yes |
| `GET /auth/me` | Yes | Yes |
| `GET /leads` | Yes | Yes |
| `GET /leads/:id` | Yes | Yes |
| `POST /leads` | Yes | Yes |
| `PUT /leads/:id` | Yes | Yes |
| `DELETE /leads/:id` | Yes | No |
| `GET /leads/export` | Yes | No |

## Auth

### POST `/auth/register`

Creates a new `sales` user.

Request body:

```json
{
  "name": "Asha Patel",
  "email": "asha@smartleads.local",
  "password": "StrongPass123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6650f6b0f3d545f4040d4a10",
      "name": "Asha Patel",
      "email": "asha@smartleads.local",
      "role": "sales",
      "createdAt": "2026-05-20T09:30:00.000Z"
    },
    "token": "jwt-token"
  }
}
```

### POST `/auth/login`

Request body:

```json
{
  "email": "asha@smartleads.local",
  "password": "StrongPass123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6650f6b0f3d545f4040d4a10",
      "name": "Asha Patel",
      "email": "asha@smartleads.local",
      "role": "sales",
      "createdAt": "2026-05-20T09:30:00.000Z"
    },
    "token": "jwt-token"
  }
}
```

### GET `/auth/me`

Returns the current authenticated user.

## Leads

### GET `/leads`

Returns paginated leads.

Query params:

- `status`: `New | Contacted | Qualified | Lost`
- `source`: `Website | Instagram | Referral`
- `search`: text search across lead name and email
- `sort`: `latest | oldest`
- `page`: number

Example request:

```text
GET /api/leads?status=Qualified&source=Instagram&sort=latest&page=1
```

Example response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "6650f8b4f3d545f4040d4a22",
      "name": "Rahul Verma",
      "email": "rahul@example.com",
      "status": "Qualified",
      "source": "Instagram",
      "createdBy": "6650f6b0f3d545f4040d4a10",
      "createdAt": "2026-05-20T09:45:00.000Z",
      "updatedAt": "2026-05-20T09:45:00.000Z"
    }
  ],
  "meta": {
    "totalRecords": 1,
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

### GET `/leads/:id`

Returns a single lead.

### POST `/leads`

Available to `admin` and `sales`.

Request body:

```json
{
  "name": "Rahul Verma",
  "email": "rahul@example.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

### PUT `/leads/:id`

Available to `admin` and `sales`.

Request body supports partial updates:

```json
{
  "status": "Contacted"
}
```

### DELETE `/leads/:id`

Admin only.

Success response:

```json
{
  "success": true,
  "data": {
    "id": "6650f8b4f3d545f4040d4a22"
  }
}
```

### GET `/leads/export`

Admin only.

Supports the same filters as `GET /leads`.

Returns:

- Content type: `text/csv`
- File name: `leads.csv`

## Common Status Codes

- `200` Success
- `201` Created
- `400` Validation error
- `401` Unauthorized
- `403` Forbidden
- `404` Not found
- `409` Conflict
- `500` Unexpected server error
