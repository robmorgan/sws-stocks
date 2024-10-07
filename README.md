![SWS App Screenshot](/_docs/sws-ss.png)

# Simply Wall St: Stocks App

This is a simple app that demonstrates a two-tier architecture using Docker Compose. It consists of a frontend built
using Next.JS and a backend API built using Express.js. The API database is a SQLite3 database.

## Features

**Frontend:**
- Company listing with filtering and sorting capabilities
- Detailed company information display
- Theme toggle for light/dark mode
- Responsive design for various screen sizes

**Backend:**
- RESTful API endpoints for retrieving company data
- Filtering and sorting capabilities
- SQLite3 database for data storage
- Logging and error handling

## Usage

Simply run the app using Docker:

```sh
docker compose up
```

Then the app will be available at [http://app.traefik.me](http://app.traefik.me) and the API at
[http://api.traefik.me](http://api.traefik.me).

Additionally a Swagger UI is available at [http://api.traefik.me/api-docs/](http://api.traefik.me/api-docs/), but only
when running in development mode.

## Testing

### Running the Automated Tests

The backend API includes an automated test suite. To run the tests, execute the following command:

```sh
cd backend
npm run test
```

### GitHub Actions

The backend API includes a GitHub Actions workflow that runs the automated tests on every push to a pull request or the
`main` branch.

## Performance

This app has been built with performance in mind. Running the included benchmark script `./bench.sh` against the API on
2021 MacBook Pro, yields the following results:

```sh
❯ ./bench.sh 
Running benchmark...
Running 30s test @ http://api.traefik.me/v1/companies
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    80.84ms   71.48ms   1.99s    97.96%
    Req/Sec   340.33     71.09   647.00     77.48%
  122104 requests in 30.10s, 342.36MB read
  Socket errors: connect 0, read 448, write 0, timeout 284
Requests/sec:   4056.08
Transfer/sec:     11.37MB
```

4,056 requests per second is very good for most APIs. We could improve this by using a more powerful machine or
multiple nodes, but this is a good starting point. Additionally, the error rate is roughly 0.6% (448 read errors and 284
timeouts out of 122,104 requests) which is generally acceptable. Based on these metrics and the fact there are only 12
companies in the database, I've opted not to include any pagination or caching.

### Scalability Considerations

If we want to scale this app, we could consider the following:

 * Caching with a tool like Redis.
 * Horizontal scaling with a tool like Kubernetes.
 * Load Balancing with a tool like Nginx/HAProxy.
 * Using a CDN for static assets.
 * Rate Limiting the API with an LRU Cache. 

## Design Decisions


I decided to skip an ORM layer and use use `better-sqlite3` because its a fast, synchronous SQLite3 library with simple
usage for direct queries. It's great for small applications where you want full control over your SQL queries.
Additionally, it has prepared statements which are great from a security and performance perspective. It is configured
to run in read-only mode, so we don't need to worry about concurrency issues.

After reviewing several ORMs, I found they were limited by complex workarounds in order to support `JOIN` queries. See:
https://github.com/prisma/prisma/discussions/12715 and https://www.prisma.io/blog/prisma-orm-now-lets-you-choose-the-best-join-strategy-preview. 
Additionally, in some cases I noticed they were running multiple queries for the same set of data and suffered from
explicit TypeScript support.
