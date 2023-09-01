import React, {useState} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {ColorRing} from 'react-loader-spinner';
import {LuCheckCircle, LuXCircle} from 'react-icons/lu';
import classNames from 'classnames';

const formSchema = Yup.object({
  firstName: Yup.string()
    .max(20, 'Der Wert darf maximal 20 Zeichen lang sein.')
    .required('Pflichtfeld'),
  surName: Yup.string()
    .max(30, 'Der Wert darf maximal 30 Zeichen lang sein.')
    .required('Pflichtfeld'),
  email: Yup.string()
    .email('Das Format der E-Mail Adresse stimmt nicht.')
    .required('Pflichtfeld'),
  message: Yup.string()
    .max(800, 'Die Nachricht darf maximal 800 Zeichen lang sein.')
    .required('Pflichtfeld'),
  privacy: Yup.bool().oneOf(
    [true],
    'Du musst unsere Datenschutzerklärung zum Abschicken akzeptieren.',
  ),
});

interface Form extends Yup.InferType<typeof formSchema> {}

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!isLoading && isSent && !hasError) return <SentSuccess />;

  return (
    <>
      {!isLoading && !isSent && hasError && <SentError />}
      {isLoading && !isSent && <Loader />}
      <Formik
        initialValues={{
          firstName: '',
          surName: '',
          email: '',
          message: '',
          privacy: false,
        }}
        validationSchema={formSchema}
        onSubmit={(values, {setSubmitting}) => {
          setIsLoading(true);
          fetch('https://formsubmit.co/347a92e62fcde82723d8d823e26d4f6d', {
            method: 'POST',
            body: JSON.stringify({...values}),
            headers: {'content-type': 'application/json'},
          })
            .then(response => {
              setIsLoading(false);
              if (!response.ok) {
                setHasError(true);
              } else {
                setIsSent(true);
              }
            })
            .catch(error => {
              setIsLoading(false);
              setHasError(true);
            });
          setSubmitting(false);
        }}
      >
        <Form
          className={classNames(
            'flex flex-col gap-4 lg:mx-auto lg:max-w-4xl lg:gap-8',
            {hidden: isLoading},
          )}
        >
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
                className="z-20 w-full rounded-md border border-solid border-ccoolGray-300 bg-ccoolGray-50 p-2 lg:p-4"
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
                className="z-20 w-full rounded-md border border-solid border-ccoolGray-300 bg-ccoolGray-50 p-2 lg:p-4"
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
              className="z-20 w-full rounded-md border border-solid border-ccoolGray-300 bg-ccoolGray-50 p-2 lg:p-4"
            />
            <ErrorMessage
              name="email"
              className="text-red-500"
              component="div"
            />
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
              className="z-20 w-full rounded-md border border-solid border-ccoolGray-300 bg-ccoolGray-50 p-2 lg:p-4"
            />
            <ErrorMessage
              name="message"
              className="text-red-500"
              component="div"
            />
          </div>

          <div className="flex flex-row gap-2">
            <Field
              type="checkbox"
              name="privacy"
              id="privacy"
              className="z-20"
            />
            <label
              htmlFor="privacy"
              className="z-20 text-ccoolGray-900 after:ml-0.5 after:text-red-500 after:content-['*']"
            >
              Hiermit akzeptierst du unsere{' '}
              <a href="/datenschutz" className="inline-link text-base">
                Datenschutzerklärung
              </a>
              .
            </label>
          </div>
          <ErrorMessage
            name="privacy"
            className="text-red-500"
            component="div"
          />

          <button
            type="submit"
            className="btn btn-primary z-20 mt-4 py-4 text-white"
          >
            Abschicken
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;

const Loader = () => {
  return (
    <div className="py-24">
      <ColorRing
        visible={true}
        height={120}
        width={120}
        ariaLabel="Lade-Animation"
        colors={['#39B5AC', '#298F88', '#E28D59', '#F5CD6D', '#FDDA88']}
        wrapperClass="mx-auto mb-8"
      />
      <p className="mx-auto text-center text-base font-bold">
        Bitte warte kurz...
      </p>
    </div>
  );
};

const SentSuccess = () => {
  return (
    <div className="py-24">
      <LuCheckCircle
        color="green"
        size="120px"
        className="mx-auto mb-8"
        title="Nachricht gesendet"
      />
      <p className="mx-auto text-center text-3xl font-bold">Danke!</p>
      <p className="mx-auto text-center text-base font-bold">
        Wir haben deine Nachricht erhalten.
      </p>
    </div>
  );
};

const SentError = () => {
  return (
    <div className="py-24">
      <LuXCircle
        color="red"
        size="120px"
        className="mx-auto mb-8"
        title="Fehler beim Versenden der Nachricht"
      />
      <p className="mx-auto text-center text-3xl font-bold">Ups!</p>
      <p className="mx-auto text-center text-base font-bold">
        Beim Versenden der Nachricht ist etwas schiefgelaufen.
        <br />
        Bitte versuche es erneut.
      </p>
    </div>
  );
};
