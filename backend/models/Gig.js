import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  venueName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  ticketsLink: {
    type: String
  },
  description: {
    type: String
  }
}, { timestamps: true });

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;
