# Smart Leads Dashboard API

Base URL: `/api`

## Auth

### POST /auth/register

Request body:

```
{
  "name": "Asha Patel",
  "email": "asha@smartleads.local",
  "password": "StrongPass123"
}
```

Response:

```
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "Asha Patel",
      "email": "asha@smartleads.local",
      "role": "sales",
      "createdAt": "..."
    },
    "token": "..."
  }
}
```

### POST /auth/login

Request body:

```
{
  "email": "asha@smartleads.local",
  "password": "StrongPass123"
}
```

### GET /auth/me

Authorization: `Bearer <token>`

## Leads

Authorization: `Bearer <token>`

### GET /leads

Query params: `status`, `source`, `search`, `sort`, `page`

Response includes pagination metadata.

### GET /leads/:id

### POST /leads

Request body:

```
{
  "name": "Rahul Verma",
  "email": "rahul@example.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

### PUT /leads/:id

Request body supports partial updates.

### DELETE /leads/:id

Admin only.

### GET /leads/export

Returns CSV for the current filters.
