![SWS App Screenshot](/_docs/sws-ss.png)

# Simply Wall St: Stocks App

⚠️ **Note:** This is a work in progress.

I opted not to include pagination as there are only 12 companies in the database.

## TODO

- [ ] Redis or Cache
- [ ] GitHub Actions
- [ ] Testing
  - [ ] Backend
    - [ ] Basic Request
    - [ ] Pagination
    - [ ] Query: Include Prices
  - [ ] Frontend
    - [ ] Graph Tooltip Offset

 * Ensure the price displayed is the latest price (e.g: DESC)

## Scalability Considerations

 * Load Balancer for distributing traffic.
 * CDN.
 * Rate Limiting with an LRU Cache. 

## Bugs

- [ ] When you filter by exchange, its not taking the sorting into account. Maybe always pass this from the frontend instead of empty.