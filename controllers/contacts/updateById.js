const Contact = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const updateById = async (req, res, next) => {
  const {
    body,
    user: { userId },
  } = req;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    body
  );
  if (result === null)
    throw RequestError(400, `There are no contacts with id: ${contactId}`);
  res.json(result);
};

module.exports = updateById;
