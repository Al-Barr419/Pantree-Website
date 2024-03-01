import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required(),
})

function MailListForm() {
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/Fruits.png")` }}
      >
        <div className="logo text-center mt-4">
          <button onClick={() => navigate('/')}>
            <img
              src="/Logo.png"
              alt="Company Logo"
              className="mx-auto"
              style={{ maxWidth: '300px', marginBottom: '2rem' }}
            />
          </button>
        </div>
        <Formik
          initialValues={{ first_name: '', last_name: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/add-contact`, {
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
              })
              .then((response) => {
                console.log(response.data)
                setSubmitted(true)
                actions.resetForm()
              })
              .catch((error) => {
                console.error('Error:', error)
                actions.setSubmitting(false)
              })

            console.log(values)
            actions.setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <>
              {submitted ? (
                <div className="text-center p-8 bg-[#DFF1FF] text-[#00566E] rounded-lg shadow-lg self-center">
                  Thank you for joining the Waitlist!
                </div>
              ) : (
                <Form className="bg-[#F1FCFF] text-[#00566E] p-8 rounded-lg shadow-lg self-center">
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

                  <label
                    htmlFor="email"
                    className="block font-bold text-lg mb-2"
                  >
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
      </div>
    </div>
  )
}

export default MailListForm
