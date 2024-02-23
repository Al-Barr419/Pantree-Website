import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required(),
});

function MailListForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{ first_name: "", last_name: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/add-contact`, {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
          })
          .then((response) => {
            console.log(response.data);
            setSubmitted(true);
            actions.resetForm(); 
          })
          .catch((error) => {
            console.error("Error:", error);
            actions.setSubmitting(false);
          });

        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <>
          {submitted ? (
            <div className="text-center p-8 bg-[#DFF1FF] text-[#00566E] rounded-lg shadow-lg">
              Thank you for joining the Waitlist!
            </div>
          ) : (
            <Form className="bg-[#F1FCFF] text-[#00566E] p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <label
                  htmlFor="first_name"
                  className="block font-bold text-lg mb-2"
                >
                  First Name
                </label>
                <Field
                  name="first_name"
                  type="text"
                  className="w-full py-2 px-3 border rounded-lg"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 mt-2"
                />

                <label
                  htmlFor="last_name"
                  className="block font-bold text-lg mt-4 mb-2"
                >
                  Last Name
                </label>
                <Field
                  name="last_name"
                  type="text"
                  className="w-full py-2 px-3 border rounded-lg"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 mt-2"
                />
              </div>

              <label htmlFor="email" className="block font-bold text-lg mb-2">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full py-2 px-3 border rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-2"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-[#00566E] text-white py-2 px-4 rounded-lg hover:bg-[#ddeeff]"
              >
                Submit
              </button>
            </Form>
          )}
        </>
      )}
    </Formik>
  );
}

export default MailListForm;
