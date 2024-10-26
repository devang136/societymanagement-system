const Society = require('../models/Society');

exports.createSociety = async (societyData) => {
  const society = new Society(societyData);
  await society.save();
  return society;
};

exports.getAllSocieties = async () => {
  return await Society.find();
};

exports.getSocietyById = async (id) => {
  return await Society.findById(id);
};

exports.updateSociety = async (id, updateData) => {
  return await Society.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteSociety = async (id) => {
  return await Society.findByIdAndDelete(id);
};