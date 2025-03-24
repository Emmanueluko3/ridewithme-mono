import { formFeedback } from "@/constants/helpers";
import * as Yup from "yup";

export const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email(formFeedback.invalidEmail)
    .required(formFeedback.required("Email")),
  password: Yup.string().required(formFeedback.required("Password")),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email(formFeedback.invalidEmail)
    .required(formFeedback.required("Email")),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    )
    .required(formFeedback.required("Password")),
});
