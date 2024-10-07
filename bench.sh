#!/bin/bash

echo "Running benchmark..."

# -t: number of threads
# -c: number of connections to keep open
# -d: duration of the test
wrk -t12 -c400 -d30s http://api.traefik.me/v1/companies
