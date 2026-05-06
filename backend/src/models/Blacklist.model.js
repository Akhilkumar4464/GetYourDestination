import mongoose from 'mongoose'

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'Token is required for blacklisting'],
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600
    }
  }
)

const blacklistModel = mongoose.model('Blacklist', blacklistSchema)

export default blacklistModel