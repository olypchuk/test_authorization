const RequestError = require("../../helpers/RequestError");
const Contact = require("../../models/contact");
const User = require("../../models/users");

const removeById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  }).then(result => {
    if (result === null)
    throw RequestError(404, `There are no contacts with id: ${contactId}`);
    User.findByIdAndUpdate(_id, { $pull: { contactUser: result._id } }).then(user => {
        if (user) { 
          res.json(result);
        }
      })
    })};

module.exports = removeById;
