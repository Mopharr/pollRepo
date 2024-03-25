import { useState, useEffect, FormEvent } from "react";
import { UserProfile, type ProfileData } from "../../types/auth";
import { Container } from "../../ui";
import { IoAddCircleOutline } from "react-icons/io5";
import { PiCamera } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import PlaceholderCover from "@/public/asset/image/PlaceholderCover.jpg";
import PlaceholderProfile from "@/public/asset/image/PlaceholderProfile.jpg";
import { Switch } from "antd";
import styles from "@/styles/editprofile.module.css";
import ProfileInput from "@/ui/ProfileInput/ProfileInput";
import { validateDob } from "@/utils/validateInput";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  options,
  optionalFields,
  demographicsKey,
} from "../../constants/profileOptions";
import { Data, extractValidProfileData } from "../../helpers";
import { handlePrivateRequest } from "../../utils/http";
import { UserAuth } from "../../context/AuthContext";
import useNotify from "../../hooks/useNotify";
import { userFormData } from "../../constants/userFormData";
import { formatDate } from "../../utils/formatDate";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi2";
import { useRouter } from "next/router";

type DobField = "day" | "month" | "year";

type PasswordData = {
  new_password1: string;
  new_password2: string;
};

type ImageURL = {
  cover_image: string;
  profile_photo: string;
};

type FormError = {
  birth_date: string;
};

const EditProfile = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  const [dob, setDob] = useState<{
    day: string;
    month: string;
    year: string;
  }>({
    day: "",
    month: "",
    year: "",
  });

  const bioMaxLength: number = 250;

  const { sessionId, userProfile, setUserProfile } = UserAuth();
  console.log("checing user pro", userProfile);

  const notify = useNotify();

  const [activeTab, setActiveTab] = useState<string>("editProfile");

  const [formData, setFormData] = useState<ProfileData>(userFormData);

  const [profileIsNull, setProfileIsNull] = useState(true);

  const isAnyPropertyTruthy = () => {
    return Object.values(formData).some((value) => !!value);
  };

  const [errors, setErrors] = useState<FormError>({
    birth_date: "",
  });

  const [profileIsLoading, setProfileIsLoading] = useState<boolean>(false);
  const [editProfileError, setEditProfileError] = useState<{
    [key: string]: [];
  }>({});
  const [passwordIsLoading, setPasswordIsLoading] = useState<boolean>(false);
  const [changePasswordError, setChangePasswordError] = useState<{
    [key: string]: [];
  }>({});

  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);

  const [passwordData, setPasswordData] = useState<PasswordData>({
    new_password1: "",
    new_password2: "",
  });

  const [activeOptionalField, setActiveOptionalField] = useState<string[]>([]);

  const [imageURL, setImageURL] = useState<ImageURL>({
    cover_image: "",
    profile_photo: "",
  });

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

  const handleDobChange = (value: string, field: DobField) => {
    setDob((prevDob) => ({ ...prevDob, [field]: value }));
  };

  useEffect(() => {
    if (userProfile && profileIsNull) {
      setFormData({
        display_name: userProfile?.display_name || "",
        username: userProfile?.username || "",
        gender: userProfile?.demographics?.gender || "",
        income: userProfile?.demographics?.income || "",
        education: userProfile?.demographics?.education || "",
        ethnicity: userProfile?.demographics?.ethnicity || "",
        marital_status: userProfile?.demographics?.marital_status || "",
        birth_date: userProfile?.demographics?.birth_date || "",
        country: userProfile?.demographics?.country || "",
        city: userProfile?.demographics?.city || "",
        state: userProfile?.demographics?.state || "",
        employment_status: userProfile?.demographics?.employment_status || "",
        occupation: userProfile?.demographics?.occupation || "",
        fav_sport: userProfile?.demographics?.fav_sport || "",
        hobbies: userProfile?.demographics?.hobbies || "",
        fav_music: userProfile?.demographics?.fav_music || "",
        dietary_pref: userProfile?.demographics?.dietary_pref || "",
        physical_level: userProfile?.demographics?.physical_level || "",
        fav_book: userProfile?.demographics?.fav_book || "",
        social_media_usage: userProfile?.demographics?.social_media_usage || "",
        fav_movie: userProfile?.demographics?.fav_movie || "",
        travel_freq: userProfile?.demographics?.travel_freq || "",
        pet_ownership: userProfile?.demographics?.pet_ownership || "",
        bio: userProfile?.bio || "",
        is_private_votes: userProfile?.is_private_votes || false,
        is_private_polls: userProfile?.is_private_polls || false,
        cover_image: "",
        profile_photo: "",
      });

      setActiveOptionalField((prev) => {
        const activeOptions = optionalFields.filter(
          (item) => userProfile?.demographics[item.id]?.length > 0
        );

        const formedOptions = activeOptions.map(({ option }) => option);

        return [...prev, ...formedOptions];
      });

      setProfileIsNull(false);
    }
  }, [userProfile, profileIsNull]);

  useEffect(() => {
    if (dob.day || dob.month || dob.year) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birth_date: validateDob(dob) ? "" : "Invalid date of birth",
      }));
    }
  }, [dob]);

  const handleFileSelect = (name: string, value: FileList | null) => {
    if (typeof window !== "undefined") {
      if (name === "cover_image" && value !== null) {
        setFormData((prev) => ({ ...prev, [name]: value[0] }));

        const reader = new FileReader();
        reader.onload = function (event: any) {
          const imagePath = event.target.result; // Get the data URL
          setImageURL((prev) => ({ ...prev, cover_image: imagePath }));
        };

        reader.readAsDataURL(value[0]);
      } else if (name === "profile_photo" && value !== null) {
        setFormData((prev) => ({ ...prev, [name]: value[0] }));

        const reader = new FileReader();
        reader.onload = function (event: any) {
          const imagePath = event.target.result; // Get the data URL
          setImageURL((prev) => ({ ...prev, profile_photo: imagePath }));
        };

        reader.readAsDataURL(value[0]);
      }
    } else {
      console.error("Window is not defined, cannot execute FileReader.");
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (name: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOption = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: (prev as any)[name] === value ? "" : value,
    }));
  };

  const handleOptional = (option: string) => {
    if (activeOptionalField.includes(option)) {
      setActiveOptionalField((prev) => prev.filter((item) => item !== option));
      return;
    }

    setActiveOptionalField((prev) => [...prev, option]);
  };

  const handleSwitchToggle = (name: string) => {
    setFormData((prev) => ({ ...prev, [name]: !(prev as any)[name] }));
  };

  const handleResidenceChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dob.day || dob.month || dob.year) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birth_date: validateDob(dob) ? "" : "Invalid date of birth",
      }));

      if (!validateDob(dob)) {
        return;
      }
    }
    const monthIndex = months.indexOf(dob.month);
    const monthNumber = monthIndex !== -1 ? monthIndex + 1 : 1;

    const data: ProfileData = {
      ...formData,
      birth_date: `${dob.year}-${monthNumber}-${dob.day}`,
    };
    const newFormData = extractValidProfileData(data);

    const myFormData: Data = {};

    for (const key of demographicsKey) {
      if (newFormData[key]) {
        myFormData[key] = newFormData[key];
        delete newFormData[key];
      }
    }

    const payload: Data = { ...newFormData, demographics: myFormData };

    const requestData: FormData = new FormData();

    for (const key in payload) {
      if (key === "demographics") {
        requestData.append(key, JSON.stringify(payload[key]));
      } else {
        requestData.append(key, payload[key]);
      }
    }

    setProfileIsLoading(true);

    try {
      const data = (await handlePrivateRequest<FormData>(
        "put",
        "/profiles/profile/",
        requestData
      )) as any;

      const profileData = data.profile as UserProfile;

      // console.log(profileData);

      if (imageURL.cover_image) {
        setImageURL((prev) => ({ ...prev, cover_image: "" }));
      }

      if (imageURL.profile_photo) {
        setImageURL((prev) => ({ ...prev, profile_photo: "" }));
      }

      setUserProfile(profileData);
      notify("Profile updated successfully", "success", {
        toastId: sessionId,
      });
      setEditProfileError({});
    } catch (error: any) {
      console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify("Error updating profile", "error", {
          toastId: sessionId,
        });

        setEditProfileError(error?.response?.data?.profile);
      }
    } finally {
      setProfileIsLoading(false);
    }
  };

  const handleSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordIsLoading(true);

    try {
      const data = (await handlePrivateRequest<PasswordData>(
        "post",
        "/auth/password/change/",
        passwordData
      )) as any;

      setPasswordData({ new_password1: "", new_password2: "" });
      notify(data?.detail, "success", {
        toastId: sessionId,
      });
      setChangePasswordError({});
    } catch (error: any) {
      console.log(error?.response?.data);
      if (!error?.response) {
        notify("Check your internet connection", "error", {
          toastId: sessionId,
        });
      }
      if (error?.response) {
        notify("Error changing password", "error", {
          toastId: sessionId,
        });

        setChangePasswordError(error?.response?.data);
      }
    } finally {
      setPasswordIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.navigation}>
        <Container className={styles.containerTop}>
          <div className={styles.topBar}>
            <HiArrowLeft onClick={handleGoBack} className={styles.titleIcon} />

            <div>
              <button
                className={activeTab === "editProfile" ? styles.active : ""}
                onClick={() => setActiveTab("editProfile")}
              >
                Edit profile
              </button>
              <button
                className={activeTab === "changePassword" ? styles.active : ""}
                onClick={() => setActiveTab("changePassword")}
              >
                Change password
              </button>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.photoSection}>
        <div className={styles.coverImage}>
          <Image
            src={
              (imageURL.cover_image
                ? imageURL.cover_image
                : userProfile?.cover_image_url
                ? userProfile?.cover_image_url
                : PlaceholderCover) as string
            }
            width={100}
            height={100}
            alt="cover_image"
          />
          {activeTab === "editProfile" && (
            <label htmlFor="cover_image">
              <input
                type="file"
                name="cover_image"
                id="cover_image"
                onChange={(e) =>
                  handleFileSelect(e.target.name, e.target.files)
                }
              />
              <PiCamera size={40} />
            </label>
          )}
        </div>

        <div className={styles.profilePhoto}>
          <div>
            <Image
              src={
                (userProfile?.profile_photo_url === "/profile_default.png"
                  ? PlaceholderProfile
                  : imageURL.profile_photo
                  ? imageURL.profile_photo
                  : userProfile?.profile_photo_url) as string
              }
              width={100}
              height={100}
              alt="profile_photo"
            />

            {activeTab === "editProfile" && (
              <label htmlFor="profile_photo">
                <input
                  type="file"
                  name="profile_photo"
                  id="profile_photo"
                  onChange={(e) =>
                    handleFileSelect(e.target.name, e.target.files)
                  }
                />
                <PiCamera size={30} />
              </label>
            )}
          </div>
        </div>
      </section>

      {activeTab === "editProfile" && (
        <section className={styles.editProfileSection}>
          <Container className={styles.containerBox}>
            <form
              className={styles.formOne}
              onSubmit={handleProfileSubmit}
              encType="multipart/form-data"
            >
              <ProfileInput
                type="text"
                id="display_name"
                name="display_name"
                label="Display name"
                value={formData.display_name}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />

              <ProfileInput
                type="text"
                id="username"
                name="username"
                label="Username"
                value={formData.username}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />

              <div className={styles.about}>
                <label htmlFor="bio">About me</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  maxLength={bioMaxLength}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {formData.bio?.length > 0 && (
                  <p>
                    Characters left: {bioMaxLength - formData.bio?.length} /{" "}
                    {bioMaxLength}
                  </p>
                )}
              </div>

              <ProfileInput
                type="selectOne"
                id="gender"
                name="gender"
                label="Gender"
                value={formData.gender}
                options={options.gender}
                activeOption={formData.gender}
                onSelectChange={(option) =>
                  handleSelectOption("gender", option)
                }
                serverError={editProfileError?.gender}
              />

              <div className={styles.dobDisplay}>
                <p>Birth Date: </p>

                <p>
                  {formData.birth_date
                    ? formatDate(formData?.birth_date)
                    : "You haven't provided"}
                </p>
              </div>
              <div style={{ marginBottom: "0.9rem" }}>
                <div className={styles.dobSelects}>
                  <select
                    className={styles.customizeSelect}
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
                    className={styles.customizeSelect}
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
                    className={styles.customizeSelect}
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

                {editProfileError?.birth_date &&
                  editProfileError?.birth_date?.map((error) => (
                    <p key={error} className={styles.error}>
                      {error}
                    </p>
                  ))}
              </div>

              <div className={styles.inputGrid}>
                {/* <ProfileInput
                  type="selectOne"
                  id="income"
                  name="income"
                  label="Income"
                  value={formData.income}
                  options={options.income}
                  activeOption={formData.income}
                  onSelectChange={(option) =>
                    handleSelectOption("income", option)
                  }
                  serverError={editProfileError?.income}
                />

                <ProfileInput
                  type="selectOne"
                  id="education"
                  name="education"
                  label="Education"
                  value={formData.education}
                  options={options.education}
                  activeOption={formData.education}
                  onSelectChange={(option) =>
                    handleSelectOption("education", option)
                  }
                  serverError={editProfileError?.education}
                /> */}

                <ProfileInput
                  type="selectTwo"
                  id="ethnicity"
                  name="ethnicity"
                  label="Ethnicity"
                  value={formData.ethnicity}
                  options={options.ethnicity.filter((value) =>
                    value
                      .toLowerCase()
                      .includes(formData.ethnicity.toLowerCase())
                  )}
                  activeOption={formData.ethnicity}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  onSelectChange={(option) =>
                    handleSelectOption("ethnicity", option)
                  }
                  serverError={editProfileError?.ethnicity}
                />

                <ProfileInput
                  type="selectOne"
                  id="marital_status"
                  name="marital_status"
                  label="Marital status"
                  value={formData.marital_status}
                  options={options.marital_status}
                  activeOption={formData.marital_status}
                  onSelectChange={(option) =>
                    handleSelectOption("marital_status", option)
                  }
                  serverError={editProfileError?.marital_status}
                />
                {/* <ProfileInput
                  type="selectOne"
                  id="employment_status"
                  name="employment_status"
                  label="Employment status"
                  value={formData.employment_status}
                  options={options.employment_status}
                  activeOption={formData.employment_status}
                  onSelectChange={(option) =>
                    handleSelectOption("employment_status", option)
                  }
                  serverError={editProfileError?.employment_status}
                /> */}

                <ProfileInput
                  type="selectTwo"
                  id="occupation"
                  name="occupation"
                  label="Occupation"
                  value={formData.occupation}
                  options={options.occupation.filter((value) =>
                    value
                      .toLowerCase()
                      .includes(formData.occupation.toLowerCase())
                  )}
                  activeOption={formData.occupation}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  onSelectChange={(option) =>
                    handleSelectOption("occupation", option)
                  }
                  serverError={editProfileError?.occupation}
                />

                <div>
                  <CountrySelect
                    containerClassName={styles.countryBox}
                    inputClassName={`${styles.countryInput} ${
                      userProfile?.demographics?.country
                        ? styles.activePlaceholder
                        : ""
                    }`}
                    onChange={(e: any) => {
                      setCountryId(e.id);
                      handleResidenceChange("country", e.name);
                    }}
                    onTextChange={(e: any) =>
                      handleResidenceChange("country", e.target.value)
                    }
                    placeHolder={
                      userProfile?.demographics?.country
                        ? userProfile?.demographics?.country
                        : "Country"
                    }
                  />
                  {editProfileError?.country &&
                    editProfileError?.country?.map((error) => (
                      <p key={error} className={styles.error}>
                        {error}
                      </p>
                    ))}
                </div>

                <div>
                  <StateSelect
                    containerClassName={styles.countryBox}
                    inputClassName={`${styles.countryInput} ${
                      userProfile?.demographics?.state
                        ? styles.activePlaceholder
                        : ""
                    }`}
                    countryid={countryId}
                    onChange={(e: any) => {
                      setStateId(e.id);
                      handleResidenceChange("state", e.name);
                    }}
                    onTextChange={(e: any) =>
                      handleResidenceChange("state", e.target.value)
                    }
                    placeHolder={
                      userProfile?.demographics?.state
                        ? userProfile?.demographics?.state
                        : "State"
                    }
                  />

                  {editProfileError?.state &&
                    editProfileError?.state?.map((error) => (
                      <p key={error} className={styles.error}>
                        {error}
                      </p>
                    ))}
                </div>

                <div>
                  <CitySelect
                    containerClassName={styles.countryBox}
                    inputClassName={`${styles.countryInput} ${
                      userProfile?.demographics?.city
                        ? styles.activePlaceholder
                        : ""
                    }`}
                    countryid={countryId}
                    stateid={stateId}
                    onChange={(e: any) => {
                      handleResidenceChange("city", e.name);
                    }}
                    onTextChange={(e: any) =>
                      handleResidenceChange("city", e.target.value)
                    }
                    placeHolder={
                      userProfile?.demographics?.city
                        ? userProfile?.demographics?.city
                        : "City"
                    }
                  />

                  {editProfileError?.city &&
                    editProfileError?.city?.map((error) => (
                      <p key={error} className={styles.error}>
                        {error}
                      </p>
                    ))}
                </div>

                {activeOptionalField.includes("Favorite sport") && (
                  <ProfileInput
                    type="selectTwo"
                    id="fav_sport"
                    name="fav_sport"
                    label="Favorite sport"
                    value={formData.fav_sport}
                    options={options.fav_sport.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.fav_sport.toLowerCase())
                    )}
                    activeOption={formData.fav_sport}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("fav_sport", option)
                    }
                    serverError={editProfileError?.fav_sport}
                  />
                )}

                {activeOptionalField.includes("Hobbies") && (
                  <ProfileInput
                    type="selectTwo"
                    id="hobbies"
                    name="hobbies"
                    label="Hobbies"
                    value={formData.hobbies}
                    options={options.hobbies.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.hobbies.toLowerCase())
                    )}
                    activeOption={formData.hobbies}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("hobbies", option)
                    }
                    serverError={editProfileError?.hobbies}
                  />
                )}

                {activeOptionalField.includes("Favorite music genre") && (
                  <ProfileInput
                    type="selectTwo"
                    id="fav_music"
                    name="fav_music"
                    label="Favorite music genre"
                    value={formData.fav_music}
                    options={options.fav_music.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.fav_music.toLowerCase())
                    )}
                    activeOption={formData.fav_music}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("fav_music", option)
                    }
                    serverError={editProfileError?.fav_music}
                  />
                )}

                {activeOptionalField.includes("Dietary preferences") && (
                  <ProfileInput
                    type="selectTwo"
                    id="dietary_pref"
                    name="dietary_pref"
                    label="Dietary preferences"
                    value={formData.dietary_pref}
                    options={options.dietary_pref.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.dietary_pref.toLowerCase())
                    )}
                    activeOption={formData.dietary_pref}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("dietary_pref", option)
                    }
                    serverError={editProfileError?.dietary_pref}
                  />
                )}

                {activeOptionalField.includes("Physical activity level") && (
                  <ProfileInput
                    type="selectOne"
                    id="physical_level"
                    name="physical_level"
                    label="Physical activity level"
                    value={formData.physical_level}
                    options={options.physical_level}
                    activeOption={formData.physical_level}
                    onSelectChange={(option) =>
                      handleSelectOption("physical_level", option)
                    }
                    serverError={editProfileError?.physical_level}
                  />
                )}

                {activeOptionalField.includes("Favorite book genre") && (
                  <ProfileInput
                    type="selectTwo"
                    id="fav_book"
                    name="fav_book"
                    label="Favorite book genre"
                    value={formData.fav_book}
                    options={options.fav_book.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.fav_book.toLowerCase())
                    )}
                    activeOption={formData.fav_book}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("fav_book", option)
                    }
                    serverError={editProfileError?.fav_book}
                  />
                )}

                {activeOptionalField.includes("Social media usage") && (
                  <ProfileInput
                    type="selectOne"
                    id="social_media_usage"
                    name="social_media_usage"
                    label="Social media usage"
                    value={formData.social_media_usage}
                    options={options.social_media_usage}
                    activeOption={formData.social_media_usage}
                    onSelectChange={(option) =>
                      handleSelectOption("social_media_usage", option)
                    }
                    serverError={editProfileError?.social_media_usage}
                  />
                )}

                {activeOptionalField.includes("Preferred movie genre") && (
                  <ProfileInput
                    type="selectTwo"
                    id="fav_movie"
                    name="fav_movie"
                    label="Preferred movie genre"
                    value={formData.fav_movie}
                    options={options.fav_movie.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.fav_movie.toLowerCase())
                    )}
                    activeOption={formData.fav_movie}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("fav_movie", option)
                    }
                    serverError={editProfileError?.fav_movie}
                  />
                )}

                {activeOptionalField.includes("Travel frequency") && (
                  <ProfileInput
                    type="selectOne"
                    id="travel_freq"
                    name="travel_freq"
                    label="Travel frequency"
                    value={formData.travel_freq}
                    options={options.travel_freq}
                    activeOption={formData.travel_freq}
                    onSelectChange={(option) =>
                      handleSelectOption("travel_freq", option)
                    }
                    serverError={editProfileError?.travel_freq}
                  />
                )}

                {activeOptionalField.includes("Pet ownership") && (
                  <ProfileInput
                    type="selectTwo"
                    id="pet_ownership"
                    name="pet_ownership"
                    label="Pet ownership"
                    value={formData.pet_ownership}
                    options={options.pet_ownership.filter((value) =>
                      value
                        .toLowerCase()
                        .includes(formData.pet_ownership.toLowerCase())
                    )}
                    activeOption={formData.pet_ownership}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    onSelectChange={(option) =>
                      handleSelectOption("pet_ownership", option)
                    }
                    serverError={editProfileError?.pet_ownership}
                  />
                )}
              </div>

              <div className={styles.switches}>
                <div>
                  <div className={styles.textBox}>
                    <p>Set Polls to Private</p>
                    <p>
                      your polls will no longer be visible from your profile
                    </p>
                  </div>

                  <Switch
                    checked={formData.is_private_polls}
                    onChange={() => handleSwitchToggle("is_private_polls")}
                  />
                </div>

                <div>
                  <div className={styles.textBox}>
                    <p>Set Votes to Private</p>
                    <p>
                      your votes will no longer be visible from your profile 
                    </p>
                  </div>
                  <Switch
                    checked={formData.is_private_votes}
                    onChange={() => handleSwitchToggle("is_private_votes")}
                  />
                </div>
              </div>

              <div className={styles.addMore}>
                <button type="button">
                  <IoAddCircleOutline /> <span>Add More</span>
                </button>

                <ul className="dropdown">
                  {optionalFields?.map(({ option, id }) => (
                    <li
                      key={id}
                      onClick={() => {
                        handleOptional(option);
                      }}
                      tabIndex={0}
                      className={`${
                        activeOptionalField?.includes(option)
                          ? styles.active
                          : ""
                      }`}
                    >
                      <span>{option}</span>
                      {activeOptionalField?.includes(option) && <FaCheck />}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.submit}>
                <button
                  disabled={profileIsLoading || !isAnyPropertyTruthy()}
                  type="submit"
                >
                  {profileIsLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          </Container>
        </section>
      )}

      {activeTab === "changePassword" && (
        <section className={styles.changePassword}>
          <Container className={styles.containerBox}>
            <form className={styles.formTwo} onSubmit={handleSubmitPassword}>
              <ProfileInput
                type="password"
                id="new_password1"
                name="new_password1"
                label="New Password"
                value={passwordData.new_password1}
                required
                onChange={(e) =>
                  handlePasswordChange("new_password1", e.target.value)
                }
                serverError={changePasswordError?.new_password1}
              />
              <ProfileInput
                type="password"
                id="new_password2"
                required
                name="new_password2"
                label="Confirm new Password"
                value={passwordData.new_password2}
                onChange={(e) =>
                  handlePasswordChange("new_password2", e.target.value)
                }
                serverError={changePasswordError?.new_password2}
              />

              <div className={styles.submit}>
                <button disabled={passwordIsLoading}>
                  {passwordIsLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          </Container>
        </section>
      )}
    </main>
  );
};

export default EditProfile;
