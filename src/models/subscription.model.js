import mongoose, { Schema } from 'mongoose';

const subscriptionSchema = mongoose.Schema(
  {
    subscriber: {
      typr: Schema.Types.ObjectId,
      ref: 'User',
    },
    channel: {
      typr: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    TimeRanges: true,
  }
);

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
