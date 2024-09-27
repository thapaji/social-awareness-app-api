import express from 'express';
import {
    insertEvent,
    getAnEvent,
    getAllEvents,
    updateEventById,
    deleteEvent
} from '../models/EventModel.js';
import { requestHandler } from '../utils/requestHandler.js';
import upload from '../config/multerConfig.js';
import cloudinary from '../config/cloudinaryConfig.js';

const router = express.Router();

router.post("/", upload.single('image'), async (req, res) => {
    try {
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const operation = async () => {
            const { title, description, causeId, causeTitle, date, location, participants, comments } = req.body;

            const eventData = {
                title,
                description,
                cause: { causeId, causeTitle },
                date,
                location,
                participants: participants || [],
                comments: comments || [],
                image: imageUrl,
            };

            const event = await insertEvent(eventData);
            if (event?._id) {
                return { status: "success", message: "Event created successfully", event };
            }

            throw new Error("Unable to create event");
        };

        requestHandler(operation, res);
    } catch (error) {
        console.error("Error uploading image or creating event:", error);
        return res.status(500).json({ message: "Error uploading image or creating event" });
    }
});

router.get("/", async (req, res) => {
    const operation = async () => {
        const events = await getAllEvents();
        return { status: "success", events };
    };
    requestHandler(operation, res);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const event = await getAnEvent({ _id: id });
        if (event) {
            return { status: "success", event };
        }
        throw new Error("Event not found");
    };
    requestHandler(operation, res);
});

router.put("/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    const existingEvent = await getAnEvent({ _id: id });
    let imageUrl = existingEvent.image ? existingEvent.image : '';

    if (req.file) {
        try {
            if (existingEvent && existingEvent.image) {
                const publicId = existingEvent.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);  
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadResult.secure_url;
        } catch (error) {
            console.error("Error handling image:", error);
            return res.status(500).json({ message: "Error handling image" });
        }
    }

    const operation = async () => {
        const { title, description, causeId, causeTitle, date, location, participants, comments } = req.body;

        const updatedEventData = {
            title,
            description,
            cause: { causeId, causeTitle },
            date,
            location,
            participants: participants || [],
            comments: comments || [],
            image: imageUrl,
        };

        const updatedEvent = await updateEventById({ _id: id, obj: updatedEventData });
        if (updatedEvent) {
            return { status: "success", message: "Event updated successfully", updatedEvent };
        }
        throw new Error("Unable to update event");
    };

    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;

    const operation = async () => {
        const eventsToDelete = await getAllEvents(); 
        const deletedEvents = await deleteEvent(ids); 

        for (const event of eventsToDelete) {
            if (ids.includes(event._id.toString()) && event.image) {
                const publicId = event.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);  
            }
        }

        return { status: "success", message: "Event(s) and associated images deleted successfully" };
    };

    requestHandler(operation, res);
});

export default router;
