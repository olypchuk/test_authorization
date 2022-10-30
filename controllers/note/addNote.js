const Note = require('../../models/notes')
const User = require('../../models/users')



const addNote = async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;

   Note.create({...body,
    owner: _id,
   }).then(resNode => {
     if (resNode) {
       User.findByIdAndUpdate(_id, { $push: { noteUser: resNode._id } })
         .then(user => {
       
         if (user) {
           res.status(201).json(resNode);
         }
         else {
           res.status(404).json({message:"Not created"});
         }
      }) 
      
    }
  });

};

module.exports = addNote;
