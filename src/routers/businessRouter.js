import express from 'express';
import {
    insertBusiness,
    getABusiness,
    getAllBusinesses,
    updateBusinessById,
    deleteBusiness
} from '../models/BusinessModel.js';
import { requestHandler } from '../utils/requestHandler.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const operation = async () => {
        const business = await insertBusiness(req.body);
        if (business?._id) {
            return { status: "success", message: "Business created successfully", business };
        }
        throw new Error("Unable to create business");
    };
    requestHandler(operation, res);
});

router.get("/", async (req, res) => {
    const operation = async () => {
        const businesses = await getAllBusinesses();
        return { status: "success", businesses };
    };
    requestHandler(operation, res);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const business = await getABusiness({ _id: id });
        if (business) {
            return { status: "success", business };
        }
        throw new Error("Business not found");
    };
    requestHandler(operation, res);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const business = await updateBusinessById({ _id: id, obj: req.body });
        if (business) {
            return { status: "success", message: "Business updated successfully", business };
        }
        throw new Error("Unable to update business");
    };
    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;
    const operation = async () => {
        await deleteBusiness(ids);
        return { status: "success", message: "Business(s) deleted successfully" };
    };
    requestHandler(operation, res);
});

export default router;
