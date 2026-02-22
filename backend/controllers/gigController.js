import Gig from '../models/Gig.js';
import mongoose from 'mongoose';

// @desc    Create a new gig
// @route   POST /api/gigs
// @access  Private
export const createGig = async (req, res) => {
  try {
    console.log('Incoming create request body:', req.body);
    const { venueName, date, time, ticketsLink, description } = req.body;

    const newGig = new Gig({
      venueName,
      date,
      time,
      ticketsLink,
      description
    });

    const savedGig = await newGig.save();
    console.log('Gig created successfully:', savedGig._id);
    res.status(201).json(savedGig);
  } catch (error) {
    console.error('Error creating gig:', error.message);
    res.status(500).json({ success: false, message: 'Server Error: Could not create gig', error: error.message });
  }
};

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (error) {
    console.error('Error fetching gigs:', error.message);
    res.status(500).json({ success: false, message: 'Server Error: Could not fetch gigs', error: error.message });
  }
};

// @desc    Update a gig
// @route   PUT /api/gigs/:id
// @access  Private
export const updateGig = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Incoming update request for ID: ${id}, body:`, req.body);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ID format: ${id}`);
      return res.status(400).json({ success: false, message: 'Invalid gig ID format' });
    }

    const updatedGig = await Gig.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!updatedGig) {
      console.warn(`Update failed: Gig not found for ID: ${id}`);
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }
    
    console.log('Gig updated successfully:', updatedGig._id);
    res.status(200).json({ success: true, data: updatedGig });
  } catch (error) {
    console.error(`Error updating gig ${req.params.id}:`, error.message);
    res.status(500).json({ success: false, message: 'Server Error: Could not update gig', error: error.message });
  }
};

// @desc    Delete a gig
// @route   DELETE /api/gigs/:id
// @access  Private
export const deleteGig = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Incoming delete request for ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ID format: ${id}`);
      return res.status(400).json({ success: false, message: 'Invalid gig ID format' });
    }

    const deletedGig = await Gig.findByIdAndDelete(id);
    
    if (!deletedGig) {
      console.warn(`Delete failed: Gig not found for ID: ${id}`);
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }
    
    console.log('Gig deleted successfully:', id);
    res.status(200).json({ success: true, message: 'Gig deleted successfully', data: deletedGig });
  } catch (error) {
    console.error(`Error deleting gig ${req.params.id}:`, error.message);
    res.status(500).json({ success: false, message: 'Server Error: Could not delete gig', error: error.message });
  }
};
