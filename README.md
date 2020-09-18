# mini-microservice-app

############ MMA-1 ##########
This is very first microservice app for learning purpose. We will create Post and Comment's service

Till here step we have created the post service and comment service

Post Service: Creating the post, fetching the post
Comment Service: Creating the comment for particular post and fetching the comments for that post

Here we are calling post api to fetch the posts and for each post we are calling the comment api that seems to be overhead. 

What we have to do is we have to call single api that will return the posts with their comments.
So we will have two options sync or async communication, as we know async is better that sync communication where we will use the event bus to tie up the listners to various services.
