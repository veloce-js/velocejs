# FastApi client package

This is the for client use.

The architect is based on [jsonql](https://jsonql.org) (One of ours)

Here is how it works:

1. Create your API by sub-classing the `FastApi`
2. Create your routes by using the decorators
3. When you run your server, we create an extra route for you `GET /fast-api` (TBC)
4. Your client will call this route and received a `contract` with detail of all the available routes

You just need to write couple line of code, and you have a fully working client / server API system.

 
