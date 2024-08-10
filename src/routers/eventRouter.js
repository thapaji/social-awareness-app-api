import express from 'express';
import {
    insertEvent,
    getAnEvent,
    getAllEvents,
    updateEventById,
    deleteEvent
} from '../models/EventModel.js';
import { requestHandler } from '../utils/requestHandler.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const operation = async () => {
        console.log(req.body)
        const event = await insertEvent(req.body);
        if (event?._id) {
            return { status: "success", message: "Event created successfully", event };
        }
        throw new Error("Unable to create event");
    };
    requestHandler(operation, res);
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

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const event = await updateEventById({ _id: id, obj: req.body });
        if (event) {
            return { status: "success", message: "Event updated successfully", event };
        }
        throw new Error("Unable to update event");
    };
    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;
    const operation = async () => {
        await deleteEvent(ids);
        return { status: "success", message: "Event(s) deleted successfully" };
    };
    requestHandler(operation, res);
});

export default router;
