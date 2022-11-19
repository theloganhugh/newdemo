import style from "./right.module.css";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect } from "react";
import Select from "react-select";
import countries from "i18n-iso-countries";
import { useFormik } from "formik";
import enLocale from "i18n-iso-countries/langs/en.json";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef } from "react";

import Head from "next/head";
import auth from "../config/firebase"
import { useSendSignInLinkToEmail } from 'react-firebase-hooks/auth';
export default function Right(props) {

  const options = [
    { value: "Role", label: "Role" },
    {
      value: "Agency / Partner Developer",
      label: "Agency / Partner Developer",
    },
    { value: "Hobbyist", label: "Hobbyist" },
    { value: "Professional Developer", label: "Professional Developer" },
    {
      value: "Technology / Business Manager",
      label: "Technology / Business Managerbbyist",
    },
    { value: "Other", label: "Other" },
  ];
  

  const [data, setData] = useState({
    email: '',
    password: '',
  })

    const [sendSignInLinkToEmail, sending, error] = useSendSignInLinkToEmail(
       auth
    );
    const actionCodeSettings = {
      // The URL to redirect to for sign-in completion. This is also the deep
      // link for mobile redirects. The domain (www.example.com) for this URL
      // must be whitelisted in the Firebase Console.
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
      // This must be true.
      handleCodeInApp: true,
    };
  const captref = useRef(null);
  const poptions = [
    { value: "Select a language", label: "Select a language" },
    { value: "ruby", label: "ruby" },
    { value: "php", label: "php" },
    { value: "python", label: "python" },
    { value: "node", label: "node" },
    { value: "java", label: "java" },
    { value: "clojure", label: "clojure" },
    { value: "scala", label: "scala" },
    { value: "go", label: "go" },
    { value: "other", label: "other" },
    { value: "none", label: "none" },
  ];
  countries.registerLocale(enLocale);
  const cobj = countries.getNames("en", { select: "official" });
  const carr = Object.entries(cobj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });
  const handleSubmit = async (values) => {
   
      const success = await sendSignInLinkToEmail(
        data.email,
        actionCodeSettings
      );
      if (success) {
        alert('Sent email');
      }
    
   console.log(data)
  };
  return (
    <>
      <Head>
        <style>
          @import
          url({'https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300&display=swap'});
        </style>
      </Head>
      <div className={style.mbody}>
      <Formik
        initialValues={{
          email: "",
          f_name: "",
          l_name:"",
          pass:""
        }}
        onSubmit={handleSubmit}
      
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="w-50" >
        
          <div className="mb-3">
            <label htmlFor="name" className={style.flabel}>
              First Name <span className={style.fspan}>*</span>
            </label>
            <input
              type="text"
              name="f_name"
              placeholder="First Name"
              className={style.finput}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="name" className={style.flabel}>
              Last Name <span className={style.fspan}>*</span>
            </label>
            <input
              type="text"
              name="l_name"
              placeholder="Last Name"
              className={style.finput}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="email" className={style.flabel}>
              Email address <span className={style.fspan}>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className={style.finput}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              value={data.email}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="com_name" className={style.flabel}>
              Company name
            </label>
            <input
              type="text"
              name="com_name"
              placeholder="Company name"
              className={style.finput}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="role" className={style.flabel}>
              Role <span className={style.fspan}>*</span>
            </label>
            <Select
              options={options}
              name="role"
              placeholder="Role"
              className={style.fsel}
            />
          
          </div>
          <div className="mb-3">
            <label htmlFor="cont" className={style.flabel}>
              Country <span className={style.fspan}>*</span>
            </label>
            <Select
              options={carr}
              name="cont"
              placeholder="Country"
              className={style.fsel}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="plang" className={style.flabel}>
              Primary development language{" "}
              <span className={style.fspan}>*</span>
            </label>
            <Select
              options={poptions}
              name="plang"
              placeholder="Select a language"
              className={style.fsel}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className={style.flabel}>
              Password <span className={style.fspan}>*</span>
            </label>
            <input
              type="password"
              name="pass"
              placeholder="Password"
              className={style.finput}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              value={data.password}
            />
            
          </div>
          <ReCAPTCHA
            sitekey="6LciwxYjAAAAAKOA06wQy0NvXeLASiFnhT8U6hLu"
            ref={captref}
          ></ReCAPTCHA>
          <button type="submit" className={style.btn}>
        <soan>
        Create an Account
        </soan>
          </button>
          </Form>
        )}
      </Formik>
      </div>
    </>
  );
}
