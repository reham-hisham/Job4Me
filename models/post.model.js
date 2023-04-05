const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
 
  
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }

});

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,

    required: true
  }
});

const postSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  images: {
    type: [String],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  reactions: [reactionSchema],
  comments: [commentSchema]
}, {
  timestamps: true
});
postSchema.virtual('reactionsUsers' , {
  ref:'User',
  localField:'reactions.user',
  foreignField :'_id',


})
postSchema.virtual('reactionsCompany' , {
  ref:'Company',
  localField:'reactions.user',
  foreignField :'_id'
  ,        strictPopulate: false,

})
postSchema.virtual('commentsUsers' , {
  ref:'User',
  localField:'comments.user',
  foreignField :'_id',


})
postSchema.virtual('commentsCompany' , {
  ref:'Company',
  localField:'comments.user',
  foreignField :'_id'
  ,        strictPopulate: false,

})
postSchema.set('toObject',{virtuals:true},{strictPopulate:false})
postSchema.set('toJSON',{virtuals:true},{strictPopulate:false})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
