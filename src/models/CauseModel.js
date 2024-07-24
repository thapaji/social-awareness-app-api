import CauseSchema from "../schema/CauseSchema.js";

export const insertCause = (cause) => {
    console.log(cause)
    return CauseSchema(cause).save();
}



export const getACause = (filter) => {
    return CauseSchema.findOne(filter);
}

export const getAllCauses = () => {
    return CauseSchema.find();
}


export const updateCauseById = async ({ _id, obj }) => {
    console.log(obj);
    return await CauseSchema.findByIdAndUpdate(_id, obj);
}


export const deleteCause = (ids) => {
    return CauseSchema.deleteMany({ _id: { $in: ids } });
}