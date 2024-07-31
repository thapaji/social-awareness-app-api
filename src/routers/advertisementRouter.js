import express from 'express';
import {
    insertAdvertisement,
    getAnAdvertisement,
    getAllAdvertisements,
    updateAdvertisementById,
    deleteAdvertisement
} from '../models/AdvertisementModel.js';
import { requestHandler } from '../utils/requestHandler.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const operation = async () => {
        const advertisement = await insertAdvertisement(req.body);
        if (advertisement?._id) {
            return { status: "success", message: "Advertisement created successfully", advertisement };
        }
        throw new Error("Unable to create advertisement");
    };
    requestHandler(operation, res);
});

router.get("/", async (req, res) => {
    const operation = async () => {
        const advertisements = await getAllAdvertisements();
        return { status: "success", advertisements };
    };
    requestHandler(operation, res);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const advertisement = await getAnAdvertisement({ _id: id });
        if (advertisement) {
            return { status: "success", advertisement };
        }
        throw new Error("Advertisement not found");
    };
    requestHandler(operation, res);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const operation = async () => {
        const advertisement = await updateAdvertisementById({ _id: id, obj: req.body });
        if (advertisement) {
            return { status: "success", message: "Advertisement updated successfully", advertisement };
        }
        throw new Error("Unable to update advertisement");
    };
    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;
    const operation = async () => {
        await deleteAdvertisement(ids);
        return { status: "success", message: "Advertisement(s) deleted successfully" };
    };
    requestHandler(operation, res);
});

export default router;
