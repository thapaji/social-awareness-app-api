import express from 'express';
import {
    insertCause,
    getACause,
    getAllCauses,
    updateCauseById,
    deleteCause
} from '../models/CauseModel.js';
import { requestHandler } from '../utils/requestHandler.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const operation = async () => {
        const cause = await insertCause(req.body);
        if (cause?._id) {
            return { status: "success", message: "Cause created successfully", cause };
        }
        throw new Error("Unable to create cause");
    };
    requestHandler(operation, res);
});

router.get("/", async (req, res) => {
    const operation = async () => {
        const causes = await getAllCauses();
        return { status: "success", causes };
    };
    requestHandler(operation, res);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const cause = await getACause({ _id: id });
        if (cause) {
            return { status: "success", cause };
        }
        throw new Error("Cause not found");
    };
    requestHandler(operation, res);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const cause = await updateCauseById({ _id: id, obj: req.body });
        if (cause) {
            return { status: "success", message: "Cause updated successfully", cause };
        }
        throw new Error("Unable to update cause");
    };
    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;
    const operation = async () => {
        await deleteCause(ids);
        return { status: "success", message: "Cause(s) deleted successfully" };
    };
    requestHandler(operation, res);
});

export default router;
