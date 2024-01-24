import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required(),
});

function MailListForm() {
  return (
    <Formik
      initialValues={{ first_name: "", last_name: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        axios
          .post(`${process.env.BACKEND_URL}/add-contact`, {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
          })
          .then((response) => console.log(response.data))
          .catch((error) => console.error("Error:", error));

        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <div>
              <label htmlFor="first_name">First Name</label>
              <Field name="first_name" type="text" />
              <ErrorMessage name="first_name" component="div" />

              <label htmlFor="last_name">Last Name</label>
              <Field name="last_name" type="text" />
              <ErrorMessage name="last_name" component="div" />
            </div>

            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default MailListForm;
