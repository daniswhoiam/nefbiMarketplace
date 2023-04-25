import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

const formSchema = Yup.object({
  firstName: Yup.string()
    .max(20, "Der Wert darf maximal 20 Zeichen lang sein.")
    .required("Pflichtfeld"),
  surName: Yup.string()
    .max(30, "Der Wert darf maximal 30 Zeichen lang sein.")
    .required("Pflichtfeld"),
  email: Yup.string()
    .email("Das Format der E-Mail Adresse stimmt nicht.")
    .required("Pflichtfeld"),
  message: Yup.string()
    .max(800, "Die Nachricht darf maximal 800 Zeichen lang sein.")
    .required("Pflichtfeld"),
  privacy: Yup.bool().oneOf(
    [true],
    "Du musst unsere Datenschutzerklärung zum Abschicken akzeptieren."
  ),
})

interface Form extends Yup.InferType<typeof formSchema> {}

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        surName: "",
        email: "",
        message: "",
        privacy: false,
      }}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        fetch("https://formsubmit.co/daniil.belazovschi@gmail.com", {
          method: "POST",
          body: JSON.stringify({ ...values }),
          headers: { "content-type": "application/json" },
        })
        setSubmitting(false)
      }}
    >
      <Form className="flex flex-col gap-4 lg:mx-auto lg:max-w-4xl lg:gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="flex flex-col gap-2 lg:w-full">
            <label
              htmlFor="firstName"
              className="text-ccoolGray-900 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Vorname
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="border-ccoolGray-300 bg-ccoolGray-50 z-20 w-full rounded-md border border-solid p-2 lg:p-4"
            />
            <ErrorMessage
              name="firstName"
              className="text-red-500"
              component="div"
            />
          </div>

          <div className="flex flex-col gap-2 lg:w-full">
            <label
              htmlFor="surName"
              className="text-ccoolGray-900 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Nachname
            </label>
            <Field
              type="text"
              id="surName"
              name="surName"
              className="border-ccoolGray-300 bg-ccoolGray-50 z-20 w-full rounded-md border border-solid p-2 lg:p-4"
            />
            <ErrorMessage
              name="surName"
              className="text-red-500"
              component="div"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-ccoolGray-900 after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Email
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            className="border-ccoolGray-300 bg-ccoolGray-50 z-20 w-full rounded-md border border-solid p-2 lg:p-4"
          />
          <ErrorMessage name="email" className="text-red-500" component="div" />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-ccoolGray-900 after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Nachricht
          </label>
          <Field
            type="text"
            id="message"
            as="textarea"
            name="message"
            rows={6}
            className="border-ccoolGray-300 bg-ccoolGray-50 z-20 w-full rounded-md border border-solid p-2 lg:p-4"
          />
          <ErrorMessage
            name="message"
            className="text-red-500"
            component="div"
          />
        </div>

        <div className="flex flex-row gap-2">
          <Field type="checkbox" name="privacy" id="privacy" className="z-20" />
          <label
            htmlFor="privacy"
            className="text-ccoolGray-900 z-20 after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Hiermit akzeptierst du unsere{" "}
            <a href="/datenschutz" className="inline-link text-base">
              Datenschutzerklärung
            </a>
            .
          </label>
        </div>
        <ErrorMessage name="privacy" className="text-red-500" component="div" />

        <button
          type="submit"
          className="btn btn-primary z-20 mt-4 py-4 text-white"
        >
          Abschicken
        </button>
      </Form>
    </Formik>
  )
}

export default ContactForm
