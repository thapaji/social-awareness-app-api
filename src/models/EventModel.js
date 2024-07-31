import EventSchema from "../schema/EventSchema.js";
import { insertOne, findOne, findAll, updateById, deleteMany } from './commonModelFunctions.js';

export const insertEvent = (event) => insertOne(EventSchema, event);

export const getAnEvent = (filter) => findOne(EventSchema, filter);

export const getAllEvents = () => findAll(EventSchema);

export const updateEventById = ({ _id, obj }) => updateById(EventSchema, _id, obj);

export const deleteEvent = (ids) => deleteMany(EventSchema, ids);
