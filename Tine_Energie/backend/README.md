# Backend API

## Endpoints

### `GET /api/hello`

Returns a greeting message.

**Query Parameters**

- `name` (optional): personalize the greeting message.

**Response**

```json
{
  "message": "Hello from TypeScript backend!"
}
```

When `name` is provided:

```json
{
  "message": "Hello from Alice!"
}
```

## Development

Install dependencies and start in development mode:

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```
