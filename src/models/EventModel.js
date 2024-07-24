import EventSchema from "../schema/EventSchema.js";


export const insertEvent = (event) => {
    console.log(event)
    return EventSchema(event).save();
}

export const getAEvent = (filter) => {
    return EventSchema.findOne(filter);
}

export const getAllEvents = () => {
    return EventSchema.find();
}

export const updateEventById = async ({ _id, obj }) => {
    console.log(obj);
    return await EventSchema.findByIdAndUpdate(_id, obj);
}

export const deleteEvent = (ids) => {
    return EventSchema.deleteMany({ _id: { $in: ids } });
}