import * as yup from "yup";

const required = "Required";
const invalid = "Invalid area";

const validations = yup.object().shape({
  email: yup.string().email(invalid).required(required),
  password: yup.string().min(8, "Password must include at least 8 letters.").required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required(),
});

export default validations;
