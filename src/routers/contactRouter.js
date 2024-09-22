import express from 'express';
import {
    insertMessage,
    getAMessage,
    getAllMessages,
    updateMessageById,
    deleteMessage
} from '../models/ContactModel.js';
import { requestHandler } from '../utils/requestHandler.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const operation = async () => {
        const message = await insertMessage(req.body);
        if (message?._id) {
            return { status: "success", message: "Message created successfully", message };
        }
        throw new Error("Unable to create message");
    };
    requestHandler(operation, res);
});

router.get("/", async (req, res) => {
    const operation = async () => {
        const messages = await getAllMessages();
        return { status: "success", messages };
    };
    requestHandler(operation, res);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const message = await getAMessage({ _id: id });
        if (message) {
            return { status: "success", message };
        }
        throw new Error("Message not found");
    };
    requestHandler(operation, res);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const message = await updateMessageById({ _id: id, obj: req.body });
        if (message) {
            return { status: "success", message: "Message updated successfully", message };
        }
        throw new Error("Unable to update message");
    };
    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;
    const operation = async () => {
        await deleteMessage(ids);
        return { status: "success", message: "Message(s) deleted successfully" };
    };
    requestHandler(operation, res);
});

export default router;
