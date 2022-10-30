const RequestError = require("../../helpers/RequestError");
const Note = require("../../models/notes");

const getById = async (req, res) => {
  const { noteId } = req.params;
  const { _id } = req.user;

  const result = await Note.findOne({ _id: noteId, owner: _id })
    .populate("contactId",{name:true,phone:true});
  if (result === null)
    throw RequestError(404, `There are no note with id: ${noteId}`);

  res.json(result);
};

module.exports = getById;
