export const insertOne = (model, data) => model.create(data);

export const findById = (model, _id) => model.findById(_id);

export const findOne = (model, filter) => model.findOne(filter);

export const findAll = (model) => model.find();

export const updateById = (model, id, update) => model.findByIdAndUpdate(id, update, { new: true });

export const updateOne = (model, filter, update) => model.findOneAndUpdate(filter, update, { new: true });

export const deleteMany = (model, ids) => model.deleteMany({ _id: { $in: ids } });