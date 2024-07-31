import BusinessSchema from "../schema/BusinessSchema.js";
import { insertOne, findOne, findAll, updateById, deleteMany } from './commonModelFunctions.js';

export const insertBusiness = (business) => insertOne(BusinessSchema, business);

export const getABusiness = (filter) => findOne(BusinessSchema, filter);

export const getAllBusinesses = () => findAll(BusinessSchema);

export const updateBusinessById = ({ _id, obj }) => updateById(BusinessSchema, _id, obj);

export const deleteBusiness = (ids) => deleteMany(BusinessSchema, ids);
