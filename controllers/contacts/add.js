const Contact = require("../../models/contact");
const User=require("../../models/users")
const add = async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;

   Contact.create({
    favorite: false,
    ...body,
    owner: _id,
   }).then(resContact => {
     if (resContact) {
       User.findByIdAndUpdate(_id, { $push: { contactUser: resContact._id } })
         .then(user => {
       
         if (user) {
           res.status(201).json(resContact);
         }
         else {
           res.status(404).json({message:"Not created"});
         }
      }) 
      
    }
  });

};

module.exports = add;
