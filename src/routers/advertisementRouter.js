import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';
import {
    insertAdvertisement,
    getAnAdvertisement,
    getAllAdvertisements,
    updateAdvertisementById,
    deleteAdvertisement
} from '../models/AdvertisementModel.js';
import { requestHandler } from '../utils/requestHandler.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post("/", upload.single('image'), async (req, res) => {
    let imageUrl = '';
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
    }
    const advertisementData = { ...req.body, image: imageUrl }
    const operation = async () => {
        const advertisement = await insertAdvertisement(advertisementData);
        if (advertisement?._id) {
            return { status: "success", message: "Advertisement created successfullyAdvertisement created successfully. Wait for Admin to activate this add before it shows up.", advertisement };
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

router.put("/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const existingAd = await getAnAdvertisement({ _id: id });
    let imageUrl = existingAd.image ? existingAd.image : '';

    if (req.file) {
        try {
            if (existingAd && existingAd.image) {
                const publicId = existingAd.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        } catch (error) {
            console.error("Error handling image:", error);
            return res.status(500).json({ message: "Error handling image" });
        }
    }

    const operation = async () => {
        const { title, description, link, business, status, lovers, comments, ratings } = req.body;

        const updatedAdData = {
            title,
            description,
            business,
            status,
            link,
            image: imageUrl,
            lovers,
            comments,
            ratings
        };

        const updatedAd = await updateAdvertisementById({ _id: id, obj: updatedAdData });
        if (updatedAd) {
            return { status: "success", message: "Advertisement updated successfully", updatedAd };
        }
        throw new Error("Unable to update advertisement");
    };

    requestHandler(operation, res);
});

router.delete("/", async (req, res) => {
    const { ids } = req.body;

    const operation = async () => {
        const adsToDelete = await getAllAdvertisements();
        const deletedAds = await deleteAdvertisement(ids);

        for (const ad of adsToDelete) {
            if (ids.includes(ad._id.toString()) && ad.image) {
                const publicId = ad.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            }
        }

        return { status: "success", message: "Advertisement(s) and associated images deleted successfully" };
    };

    requestHandler(operation, res);
});

export default router;
