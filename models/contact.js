const { Schema, model, SchemaTypes } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const contactScheme = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactScheme.post("save", handleSaveErrors);

const Contact = model("contact", contactScheme);

module.exports = Contact;
