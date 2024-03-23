import React, { FormEvent, useEffect, useState } from "react";
import styles from "./createaccount.module.css";
import Cancle from "@/public/asset/svg/cancle.svg";
import Input from "@/ui/Input/Input";
import { UserAuth } from "@/context/AuthContext";
import { interestOptions } from "@/constants/Interest";
import Link from "next/link";
import {
  validateEmail,
  validatePassword,
  // validatePhoneNumber,
  validateSecondPassword,
  validateString,
  validateGender,
  validateDob,
} from "@/utils/validateInput";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { type FormData } from "@/types/auth";
import { extractValidFormData } from "@/helpers";
import { options } from "@/constants/profileOptions";
import Image from "next/image";

interface CreateAccountModalProps {
  onClose: () => void;
}

type FormError = {
  display_name: string;
  username: string;
  email: string;
  // phone_number: string;
  birth_date: string;
  gender: string;
  password1: string;
  password2: string;
};

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({ onClose }) => {
  const { signUpError, handleSignUp, signUpIsLoading } = UserAuth();
  const [formData, setFormData] = useState<FormData>({
    display_name: "",
    username: "",
    gender: "",
    email: "",
    birth_date: "",
    interests: [],
    password1: "",
    password2: "",
    occupation: "",
    // phone_number: "",
    ethnicity: "",
    marital_status: "",
    country: "",
    city: "",
    state: "",
  });
  const [step, setStep] = useState(1);

  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);

  const [errors, setErrors] = useState<FormError>({
    display_name: "",
    username: "",
    gender: "",
    email: "",
    // phone_number: "",
    birth_date: "",
    password1: "",
    password2: "",
  });
  const [interestValues, setInterestValues] = useState<string[]>([]);

  const [dob, setDob] = useState<{ day: string; month: string; year: string }>({
    day: "",
    month: "",
    year: "",
  });

  const handleResidenceChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData.display_name);
    // else if (name === "phone_number") {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     phone_number: validatePhoneNumber(value) ? "" : "Invalid phone number",
    //   }));
    // }

    // Validate input fields as the user types
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email address",
      }));
    } else if (name === "password1") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password1: validatePassword(value)
          ? ""
          : "Password must contain at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character",
      }));
    } else if (name === "username") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: validateString(value)
          ? ""
          : "username must contain at least 3 characters",
      }));
    } else if (name === "password2") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password2: validateSecondPassword(formData.password1, value)
          ? ""
          : "it must be the same with your password",
      }));
    }
  };

  type DobField = "day" | "month" | "year";

  const goToNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    if (formData.gender) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gender: validateGender(formData.gender) ? "" : "Gender can't be empty",
      }));
    }
  }, [formData.gender]);

  const handleDobChange = (value: string, field: DobField) => {
    setDob((prevDob) => ({ ...prevDob, [field]: value }));
  };

  useEffect(() => {
    if (dob.day || dob.month || dob.year) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birth_date: validateDob(dob) ? "" : "Invalid date of birth",
      }));
    }
  }, [dob]);

  // const handleSelectInterest = (label: string, id: number) => {
  //   if (formData.interests.includes(id) && interestValues.includes(label)) {
  //     setFormData((prev) => {
  //       const newData = {
  //         ...prev,
  //         interests: prev.interests.filter((item) => item !== id),
  //       };

  //       return newData;
  //     });

  //     setInterestValues((prev) => prev.filter((item) => item !== label));

  //     return;
  //   }

  //   setFormData((prev) => {
  //     const newData = {
  //       ...prev,
  //       interests: [...prev.interests, id],
  //     };

  //     return newData;
  //   });

  //   setInterestValues((prev) => [...prev, label]);
  // };

  const handleSelectInterest = (selectedOptions: string[]) => {
    const selectedIds = selectedOptions.map(
      (option) =>
        interestOptions.find((interest) => interest.label === option)?.id || 0
    );

    setFormData((prev) => ({
      ...prev,
      interests: selectedIds,
    }));

    setInterestValues(selectedOptions);
  };

  const handleSelectOption = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: (prev as any)[name] === value ? "" : value,
    }));
  };

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  // Generate options for day, month, year
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate input fields as the user types
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    }
    if (!validatePassword(formData.password1)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password1:
          "Password must contain at least 8 characters with one uppercase letter, one lowercase letter, one number, and one special character",
      }));
    }

    if (!validateString(formData.username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "username must contain at least 3 characters",
      }));
    }
    if (!validateSecondPassword(formData.password1, formData.password2)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password2: "it must be the same with your password",
      }));
    }
    if (!validateGender(formData.gender)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gender: "Gender can't be empty",
      }));
    }
    if (!validateDob(dob)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birth_date: "Invalid date of birth",
      }));
    }

    if (
      !validateEmail(formData.email) ||
      !validatePassword(formData.password1) ||
      !validateString(formData.username) ||
      !validateSecondPassword(formData.password1, formData.password2) ||
      !validateGender(formData.gender) ||
      !validateDob(dob)
    ) {
      setStep(1);
      return;
    }

    const data: FormData = {
      ...formData,
      birth_date: `${dob.year}-${months.indexOf(dob.month) + 1}-${dob.day}`,
    };
    const newFormData = extractValidFormData(data);
    handleSignUp(newFormData);
  }

  return (
    <>
      <div className={styles.step}>
        <Image
          onClick={onClose}
          src={Cancle}
          className={styles.cancle}
          alt="Close"
        />
        <p>Step {step}/2</p>
      </div>
      <div className={styles.container}>
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className={styles.inputBox}>
                  <Input
                    type="text"
                    id="display_name"
                    name="display_name"
                    label="Display name"
                    value={formData.display_name}
                    onChange={(e) =>
                      handleInputChange("display_name", e.target.value)
                    }
                    clientError={errors?.display_name}
                    serverError={signUpError?.display_name}
                  />
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    label="username"
                    required
                    compulsory
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    clientError={errors?.username}
                    serverError={signUpError?.username}
                  />

                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    compulsory
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    clientError={errors?.email}
                    serverError={signUpError?.email}
                  />

                  <Input
                    type="password"
                    id="password1"
                    name="password1"
                    required
                    compulsory
                    label="Password"
                    value={formData.password1}
                    onChange={(e) =>
                      handleInputChange("password1", e.target.value)
                    }
                    clientError={errors?.password1}
                    serverError={signUpError?.password1}
                  />
                  <Input
                    type="password"
                    id="password2"
                    name="password2"
                    required
                    compulsory
                    label="Confirm Password"
                    value={formData.password2}
                    onChange={(e) =>
                      handleInputChange("password2", e.target.value)
                    }
                    clientError={errors?.password2}
                    serverError={signUpError?.password2}
                  />

                  {/* <Input
                    type="selectTwo"
                    id="gender"
                    name="gender"
                    label="Gender"
                    compulsory
                    value={formData.gender}
                    activeOption={formData.gender}
                    optionsTwo={options.gender.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.gender.toLowerCase())
                    )}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    onSelectOption={(option) =>
                      handleSelectOption("gender", option)
                    }
                    clientError={errors?.gender}
                    serverError={signUpError?.gender}
                 /> */}
                  <select
                    className={styles.customSelect}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    {options.gender.map((gender, inx) => (
                      <option key={inx} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                <p className={styles.pdob}>Date of Birth</p>

                <div style={{ marginBottom: "0.9rem" }}>
                  <div className={styles.dobSelects}>
                    <select
                      className={styles.customSelect}
                      onChange={(e) => handleDobChange(e.target.value, "month")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Month
                      </option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      className={styles.customSelect}
                      onChange={(e) => handleDobChange(e.target.value, "day")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Day
                      </option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>

                    <select
                      className={styles.customSelect}
                      onChange={(e) => handleDobChange(e.target.value, "year")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Year
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors?.birth_date && (
                    <p className={styles.error}>{errors?.birth_date}</p>
                  )}

                  {signUpError?.birth_date &&
                    signUpError?.birth_date?.map((error) => (
                      <p key={error} className={styles.error}>
                        {error}
                      </p>
                    ))}
                </div>

                <button
                  onClick={goToNextStep}
                  className={styles.nextButton}
                  type="button"
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.inputBox}>
                  {/* <Input
                    type="selectOne"
                    id="interests"
                    name="interests"
                    required
                    label="Interests"
                    options={interestOptions}
                    value={interestValues.join(", ")}
                    activeInterest={formData.interests}
                    onSelectChange={(label, id) =>
                      handleSelectInterest(label, id)
                    }
                    serverError={signUpError?.interests}
                  /> */}
                  <select
                    className={styles.customSelect}
                    onChange={(e) =>
                      handleSelectInterest(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    defaultValue=""
                    // multiple
                  >
                    {interestOptions.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="selectTwo"
                    id="occupation"
                    name="occupation"
                    label="Occupation"
                    value={formData.occupation}
                    activeOption={formData.occupation}
                    optionsTwo={options.occupation.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.occupation.toLowerCase())
                    )}
                    onChange={(e) =>
                      handleInputChange("occupation", e.target.value)
                    }
                    onSelectOption={(option) =>
                      handleSelectOption("occupation", option)
                    }
                  />

                  <Input
                    type="selectTwo"
                    id="ethnicity"
                    name="ethnicity"
                    label="Ethnicity"
                    value={formData.ethnicity}
                    activeOption={formData.ethnicity}
                    optionsTwo={options.ethnicity.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.ethnicity.toLowerCase())
                    )}
                    onChange={(e) =>
                      handleInputChange("ethnicity", e.target.value)
                    }
                    onSelectOption={(option) =>
                      handleSelectOption("ethnicity", option)
                    }
                  />

                  <CountrySelect
                    containerClassName={styles.countryBox}
                    inputClassName={styles.countryInput}
                    onChange={(e: any) => {
                      setCountryId(e.id);
                      handleResidenceChange("country", e.name);
                    }}
                    onTextChange={(e: any) =>
                      handleResidenceChange("country", e.target.value)
                    }
                    placeHolder="Country"
                  />

                  <StateSelect
                    containerClassName={styles.countryBox}
                    inputClassName={styles.countryInput}
                    countryid={countryId}
                    onChange={(e: any) => {
                      setStateId(e.id);
                      handleResidenceChange("state", e.name);
                    }}
                    onTextChange={(e: any) =>
                      handleResidenceChange("state", e.target.value)
                    }
                    placeHolder="State"
                  />

                  <CitySelect
                    containerClassName={styles.countryBox}
                    inputClassName={styles.countryInput}
                    countryid={countryId}
                    stateid={stateId}
                    onChange={(e: any) => {
                      handleResidenceChange("city", e.name);
                    }}
                    onTextChange={(e: any) =>
                      handleResidenceChange("city", e.target.value)
                    }
                    placeHolder="City"
                  />
                </div>

                <div className={styles.agreement}>
                  <p className={styles.tap}>
                    By Tapping Signup, I’ve read and agree to
                    <Link href="/tos"> our term and condition Use</Link> that
                    bide the management of{" "}
                    <a href="#_" rel="">
                      PollsRank.
                    </a>
                  </p>
                </div>

                <div className={styles.stepControl}>
                  <button
                    onClick={goToPreviousStep}
                    className={styles.prevButton}
                  >
                    Previous
                  </button>

                  <button
                    disabled={signUpIsLoading}
                    className={styles.signUpButton}
                  >
                    {signUpIsLoading ? "Loading..." : "Signup"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccountModal;
