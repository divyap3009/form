// const mongoose = require("mongoose");

// // Define the form schema
// const formSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
//   parent_name: String,
//   phone: String,
//   gender: String,
//   occupation: String,
//   agreedToTerms: Boolean,
// });

// const Form = mongoose.model("Form", formSchema);

// module.exports = Form;

const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  parent_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  currentAddressType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  country: {
    type: String,
  },
  occupation: {
    type: String,
    required: true,
  },
  agreedToTerms: {
    type: Boolean,
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
