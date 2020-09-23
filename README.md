# mini-microservice-app

############ MMA-4 ##########

Dockerizing the various service's

> We will create Dokerfile and write the commands in it

=================================================================================================

############ MMA-3 ##########

Adding New Comment Moderate Service that will filter particular word in the comment, on the basis on that, comment can be either in one of the state: pending | approved | rejected

Implementation for the Query Service when it went down

===================================================================================================

############ MMA-2 ##########
Event Bus and Query microservice implementation

We have set the Event bus implementaion inside the event-bus microservice, whenever user is going to create a post or comment we will emit events to event bus and then those events will be binded to all services. On the basis of event type, services will act on specfic event that they need 

Query microservice: This microservice will listen to the post creation and comment creation events. This will bind the whole data and return that in single response

===================================================================================================

############ MMA-1 ##########
This is very first microservice app for learning purpose. We will create Post and Comment's service

Till here step we have created the post service and comment service

Post Service: Creating the post, fetching the post
Comment Service: Creating the comment for particular post and fetching the comments for that post

Here we are calling post api to fetch the posts and for each post we are calling the comment api that seems to be overhead. 

What we have to do is we have to call single api that will return the posts with their comments.
So we will have two options sync or async communication, as we know async is better that sync communication where we will use the event bus to tie up the listners to various services.

===================================================================================================

PORTS DETAILS: 

React App: http://127.0.0.1:3000
Post Service: http://127.0.0.1:4000
Comment Service: http://127.0.0.1:4001
Moderate Service: http://127.0.0.1:4003
Query Service: http://127.0.0.1:4002
Event Bus Service: http://127.0.0.1:4005