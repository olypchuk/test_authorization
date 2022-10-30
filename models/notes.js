const { Schema, model, SchemaTypes } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const noteSchema = new Schema({
    title: {
    type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    contactId: {
        type: Schema.Types.ObjectId,
        ref: "contact",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    
},
    {
    versionKey: false,
    timestamps: true,
  })

const Note = model("note", noteSchema);

module.exports =Note