import express from 'express';
import {
    insertCause,
    getACause,
    getAllCauses,
    updateCauseById,
    deleteCause
} from '../models/CauseModel.js';
import { requestHandler } from '../utils/requestHandler.js';
import upload from '../config/multerConfig.js';
import cloudinary from '../config/cloudinaryConfig.js';

const router = express.Router();

router.post("/", upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const operation = async () => {
            const { title, description, category, createdBy } = req.body;
            const imageUrl = result.secure_url;

            const causeData = {
                title,
                description,
                category,
                createdBy,
                image: imageUrl,
            };

            const cause = await insertCause(causeData);

            if (cause?._id) {
                return { status: "success", message: "Cause created successfully", cause };
            }

            throw new Error("Unable to create cause");
        };

        requestHandler(operation, res);

    } catch (error) {
        console.error("Error uploading image or creating cause:", error);
        return res.status(500).json({ message: "Error uploading image or creating cause" });
    }
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

router.put("/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    const existingCause = await getACause({ _id: id });
    console.log(existingCause)
    let imageUrl = existingCause.image ? existingCause.image : '';

    if (req.file) {
        try {
            if (existingCause && existingCause.image) {
                const publicId = existingCause.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadResult.secure_url;
        } catch (error) {
            console.error("Error handling images:", error);
            return res.status(500).json({ message: "Error handling images" });
        }
    }

    const causeData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        createdBy: req.body.createdBy,
        image: imageUrl,
        participants: req.body.participants,
        comments: req.body.comments,
    };

    const operation = async () => {
        const cause = await updateCauseById({ _id: id, obj: causeData });
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
        const causesToDelete = await getAllCauses();
        const deletedCauses = await deleteCause(ids);

        for (const cause of causesToDelete) {
            if (ids.includes(cause._id.toString())) {
                const publicId = cause.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            }
        }

        return { status: "success", message: "Cause(s) and associated images deleted successfully" };
    };

    requestHandler(operation, res);
});

export default router;
