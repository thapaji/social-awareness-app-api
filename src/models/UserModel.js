import UserSchema from "../schema/UserSchema.js";
import { findOne, findById, insertOne, updateOne, deleteMany } from './commonModelFunctions.js';

export const insertUser = (user) => insertOne(UserSchema, user);

export const getUserByEmail = (email) => findOne(UserSchema, { email });

export const getAUser = (filter) => findOne(UserSchema, filter);

export const updateUser = (filter, update) => updateOne(UserSchema, filter, update);

export const deleteUser = (ids) => deleteMany(UserSchema, ids);
