const yup = require("yup");

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(8)
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "Username Is Not Valid ")
    .max(255)
    .required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

module.exports = registerSchema;
