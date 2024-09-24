import AdvertisementSchema from "../schema/AdvertisementSchema.js";
import { insertOne, findOne, findAll, updateById, deleteMany } from './commonModelFunctions.js';

export const insertAdvertisement = (advertisement) => insertOne(AdvertisementSchema, advertisement);

export const getAnAdvertisement = (filter) => findOne(AdvertisementSchema, filter);

export const getAllAdvertisements = () => findAll(AdvertisementSchema);

export const updateAdvertisementById = ({ _id, obj }) => updateById(AdvertisementSchema, _id, obj);

export const deleteAdvertisement = (ids) => deleteMany(AdvertisementSchema, ids);