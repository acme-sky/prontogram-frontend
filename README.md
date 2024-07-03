# Prontogram Frontend

## Deploy with Docker compose

First, build the local image

```
docker build -t prontogram-frontend .
```

Finally, run

```
docker compose up
```

It is exposed at `http://prontogram-frontend/` and uses the backend at `http://prontogram:8000/`.
