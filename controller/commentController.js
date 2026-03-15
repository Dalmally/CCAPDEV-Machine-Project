const Comment = require('../model/Comment')
const Post = require('../model/Post')

//This will mainly add and get posts from the database

exports.addComment = async (req, res) => {
    
    /**
     * Algorithm might go something like
     * 
     * get the postid
     * 
     * get the content and the comment author
     * 
     * save into db 
     * 
     * redirect it to the same page so user can see their own comments
     */
}

exports.getComments = async (req, res) => {
    /**
     * Algorithm should be
     * 
     * get comments from db based on postid
     * 
     * format according to the comment section in viewpost.hbs
     * 
     * push as json
     */
}