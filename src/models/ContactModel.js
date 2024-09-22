import ContactSchema from "../schema/ContactSchema.js";
import { insertOne, findOne, findAll, updateById, deleteMany } from './commonModelFunctions.js';

export const insertMessage = (message) => insertOne(ContactSchema, message);

export const getAMessage = (filter) => findOne(ContactSchema, filter);

export const getAllMessages = () => findAll(ContactSchema);

export const updateMessageById = ({ _id, obj }) => updateById(ContactSchema, _id, obj);

export const deleteMessage = (ids) => deleteMany(ContactSchema, ids);
