import DiscussionSchema from "../schema/DiscussionSchema.js";

export const insertDiscussion = (discussion) => {
    console.log(discussion)
    return DiscussionSchema(discussion).save();
}

export const getADiscussion = (filter) => {
    return DiscussionSchema.findOne(filter);
}

export const getAllDiscussions = () => {
    return DiscussionSchema.find();
}

export const updateDiscussionById = async ({ _id, obj }) => {
    console.log(obj);
    return await DiscussionSchema.findByIdAndUpdate(_id, obj);
}

export const deleteDiscussion = (ids) => {
    return DiscussionSchema.deleteMany({ _id: { $in: ids } });
}