import { ApiResponse } from "../Utils/ApiResponse.js";
import Event from "../Models/Events.js";
export const getAllEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset to 00:00:00

  const events = await Event.find()
                .populate('authorId', 'name email')
                .where('date')
                .gte(today);
    
    return res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));   
  }
}

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('authorId', 'name email');
    if (!event) {
      return res.status(404).json(new ApiResponse(404, null, "Event not found"));
    }
    return res.status(200).json(new ApiResponse(200, event, "Event fetched successfully"));
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
}

export const createEvent = async (req, res) => {
  try {
    const { title, date, location, description,type } = req.body;


    const authorId = req.user.id; 
    // Validate required fields
    if (!title || !date || !location || !description) {
      return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }

    // Here you would typically save the event to your database
    // For demonstration, we will just return the event data
    const dateOnly = new Date(req.body.date);
    dateOnly.setHours(0, 0, 0, 0);

    const newEvent = {
      title,
      date:dateOnly,
      location,
      description,
      authorId,
      type
    };

    const event = new Event(newEvent);
    await event.save();


    return res.status(201).json(new ApiResponse(200, event, "Event created successfully"));
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
}