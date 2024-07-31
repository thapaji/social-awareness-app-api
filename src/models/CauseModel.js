import CauseSchema from "../schema/CauseSchema.js";
import { insertOne, findOne, findAll, updateById, deleteMany } from './commonModelFunctions.js';

export const insertCause = (cause) => insertOne(CauseSchema, cause);

export const getACause = (filter) => findOne(CauseSchema, filter);

export const getAllCauses = () => findAll(CauseSchema);

export const updateCauseById = ({ _id, obj }) => updateById(CauseSchema, _id, obj);

export const deleteCause = (ids) => deleteMany(CauseSchema, ids);
