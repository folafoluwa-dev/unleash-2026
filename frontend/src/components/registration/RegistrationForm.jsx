import { useState } from "react";
import FormField from "./FormField.jsx";
import { registerAttendee } from "../../services/registrationService.js";

/*
 * Official LOCCI branch list supplied for UNLEASH 3.0.
 */
const LOCCI_BRANCHES = [
  "THRONE OF MERCY, Oregun",
  "KING’S COURT ASSEMBLY, Olowoira",
  "Headquater, Alapere, ketu, Lagos",
  "MERCY CAMP, Magboro",
  "GLORY GATE Assembly, Ikorodu",
  "CITY OF MERCY, Ebute Meta",
  "MOUNTAIN OF DELIVERANCE, Ibafo",
  "ARK OF NOAH,Agege",
  "TABERNACLE OF GRACE, Lekki",
  "GRACE ASSEMBLY, Bariga",
  "GATE OF MERCY, Ikorodu Town Hall",
  "ALTAR OF MERCY, Ijebu Ode",
  "COVENANT ASSEMBLY, Akute",
  "CITY OF PRAISE, Ogijo, Ogun",
  "HABITATION OF MERCY, Ayobo",
  "ABUJA Branch, FCT, Abuja",
  "MIRACLE CENTER, Ajegunle",
  "COVENANT OF MERCY, Sagamu",
  "OVERCOMERS ASSEMBLY, Mowe",
  "Ado Ekiti Branch",
  "KINGDOM OF GRACE, Ijegun",
  "AKURE branch",
  "OGBOMOSO Branch",
  "Spring of Mercy Itamaga, Ikorodu",
  "ABEOKUTA Branch",
  "CITADEL OF JUDAH, Ajah",
  "LAFIAJI Branch",
  "EJIGBO Branch",
  "ISALE-EKO Branch",
];
const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  age_group: "",
  city: "",
  additionalInformation: "",
  isLocciMember: false,
  locciBranch: "",
};

const validate = (
  formData,
  isLocciMember,
  locciBranch
) => {
  const errors = {};

  // Full name
  if (
    !formData.fullName ||
    formData.fullName.trim().length < 2
  ) {
    errors.fullName =
      "Please enter your full name.";
  }

  // Email
  if (
    !formData.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email
    )
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  // Phone
  if (!formData.phone) {
    errors.phone =
      "Please enter your phone number.";
  } else {
    const cleaned = formData.phone.replace(
      /\s+/g,
      ""
    );

    if (
      !/^(\+234|0)[789]\d{9}$/.test(
        cleaned
      )
    ) {
      errors.phone =
        "Please enter a valid Nigerian phone number.";
    }
  }

  // Age
  if (!formData.age_group) {
    errors.age_group =
      "Please enter your age.";
  } else {
    const ageNum = Number(formData.age_group);

    if (
      isNaN(ageNum) ||
      ageNum < 13 ||
      ageNum > 100
    ) {
      errors.age_group =
        "Age must be between 13 and 100.";
    }
  }

  // City
  if (
    !formData.city ||
    formData.city.trim().length < 2
  ) {
    errors.city =
      "Please enter your city or location.";
  }

  // LOCCI question
  if (
    isLocciMember === null ||
    typeof isLocciMember === "undefined"
  ) {
    errors.isLocciMember =
      "Please select whether you are from LOCCI.";
  }

  // Branch
  if (
    isLocciMember === true &&
    !locciBranch
  ) {
    errors.locciBranch =
      "Please select your LOCCI branch.";
  }

  return errors;
};

const RegistrationForm = ({
  onSuccess,
}) => {
  const [formData, setFormData] =
    useState(initialFormData);

  /*
   * null means the user has not answered yet.
   * true means they are from LOCCI.
   * false means they are not from LOCCI.
   */
  const [isLocciMember, setIsLocciMember] =
    useState(null);

  const [locciBranch, setLocciBranch] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };

        delete next[name];

        return next;
      });
    }
  };

  const handleLocciChange = (value) => {
    const member = value === "yes";

    setIsLocciMember(member);

    /*
     * If the user changes from Yes to No,
     * clear the branch selection.
     */
    if (!member) {
      setLocciBranch("");
    }

    setErrors((prev) => {
      const next = { ...prev };

      delete next.isLocciMember;
      delete next.locciBranch;

      return next;
    });
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;

    setLocciBranch(value);

    if (errors.locciBranch) {
      setErrors((prev) => {
        const next = { ...prev };

        delete next.locciBranch;

        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    const fieldErrors = validate(
      formData,
      isLocciMember,
      locciBranch
    );

    if (fieldErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(
      formData,
      isLocciMember,
      locciBranch
    );

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);

      const firstError =
        Object.keys(validationErrors)[0];

      const errorElement =
        document.querySelector(
          `[name="${firstError}"], #${firstError}`
        );

      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setErrors({});

    try {
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        age_group: formData.age_group,
        city: formData.city,
        additional_information: formData.additionalInformation,
        is_locci_member: formData.isLocciMember,
        locci_branch: formData.isLocciMember
          ? formData.locciBranch
          : "",
      };

      console.log(
        "Registration payload:",
        payload
      );

      const registrationData =
        await registerAttendee(payload);

      onSuccess(registrationData);

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      if (error.validationErrors) {
        setErrors(
          error.validationErrors
        );

        const firstError =
          Object.keys(
            error.validationErrors
          )[0];

        const errorElement =
          document.querySelector(
            `[name="${firstError}"], #${firstError}`
          );

        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        setSubmitError(
          error.message === "Failed to fetch"
            ? "Unable to complete your registration right now. Please check your connection and try again."
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-3xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-2">
            YOUR DETAILS
          </h2>

          <p className="text-unleash-brown/70">
            Fill in your details below to
            register for UNLEASH 3.0.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* Full Name */}
            <FormField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName}
              required
              autoComplete="name"
              placeholder="Enter your full name"
            />

            {/* Email */}
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />

            {/* Phone */}
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              required
              autoComplete="tel"
              placeholder="08012345678"
            />

            {/* Age */}
            <div>
              <label
                htmlFor="age_group"
                className="block text-sm font-semibold text-unleash-brown mb-2"
              >
                Age Group <span className="text-red-500">*</span>
              </label>

              <select
                id="age_group"
                name="age_group"
                value={formData.age_group}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg bg-white text-unleash-brown focus:outline-none focus:ring-2 focus:ring-unleash-orange ${errors.age_group
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              >
                <option value="">Select your age group</option>
                <option value="13-17">13–17</option>
                <option value="18-25">18–25</option>
                <option value="26-35">26–35</option>
                <option value="36-45">36–45</option>
                {/* <option value="46-55">46–55</option>
                <option value="56+">56+</option> */}
              </select>

              {errors.age_group && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.age_group}
                </p>
              )}
            </div>

            {/* City */}
            <div className="md:col-span-2">
              <FormField
                label="City / Location"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city}
                required
                autoComplete="address-level2"
                placeholder="e.g. Lagos"
              />
            </div>

            {/* LOCCI Question */}
            <div className="md:col-span-2">
              <fieldset>
                <legend className="block text-sm font-semibold text-unleash-brown mb-3">
                  Are you from Love of Christ Chapel International Ministry (LOCCI)?
                  <span className="text-unleash-orange ml-1">
                    *
                  </span>
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* YES */}
                  <label
                    className={`relative flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${isLocciMember === true
                      ? "border-unleash-orange bg-orange-50 ring-2 ring-unleash-orange/20"
                      : "border-gray-200 hover:border-unleash-orange/50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="isLocciMember"
                      value="yes"
                      checked={
                        isLocciMember === true
                      }
                      onChange={() =>
                        handleLocciChange("yes")
                      }
                      className="w-5 h-5 accent-orange-600"
                    />

                    <span className="font-medium text-unleash-brown">
                      Yes, I am from LOCCI
                    </span>
                  </label>

                  {/* NO */}
                  <label
                    className={`relative flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${isLocciMember === false
                      ? "border-unleash-orange bg-orange-50 ring-2 ring-unleash-orange/20"
                      : "border-gray-200 hover:border-unleash-orange/50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="isLocciMember"
                      value="no"
                      checked={
                        isLocciMember === false
                      }
                      onChange={() =>
                        handleLocciChange("no")
                      }
                      className="w-5 h-5 accent-orange-600"
                    />

                    <span className="font-medium text-unleash-brown">
                      No, I am not
                    </span>
                  </label>

                </div>

                {errors.isLocciMember && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.isLocciMember}
                  </p>
                )}
              </fieldset>
            </div>

            {/* LOCCI Branch */}
            {isLocciMember === true && (
              <div className="md:col-span-2">
                <label
                  htmlFor="locciBranch"
                  className="block text-sm font-semibold text-unleash-brown mb-2"
                >
                  Select Your LOCCI Branch
                  <span className="text-unleash-orange ml-1">
                    *
                  </span>
                </label>

                <select
                  id="locciBranch"
                  name="locciBranch"
                  value={locciBranch}
                  onChange={handleBranchChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3.5 rounded-lg border bg-white text-unleash-brown outline-none transition-all ${errors.locciBranch
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-unleash-orange focus:ring-2 focus:ring-orange-100"
                    }`}
                >
                  <option value="">
                    Select your branch
                  </option>

                  {LOCCI_BRANCHES.map(
                    (branch) => (
                      <option
                        key={branch}
                        value={branch}
                      >
                        {branch}
                      </option>
                    )
                  )}
                </select>

                {errors.locciBranch && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.locciBranch}
                  </p>
                )}
              </div>
            )}

            {/* Additional Information */}
            <div className="md:col-span-2">
              <FormField
                label="Additional Information"
                name="additionalInformation"
                type="textarea"
                value={
                  formData.additionalInformation
                }
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Anything you'd like us to know?"
                rows={4}
              />
            </div>

          </div>

          {/* Submission Error */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {submitError}
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col items-center gap-4">

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-4 bg-unleash-orange text-white rounded-full font-bold text-lg hover:bg-unleash-brown transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>

                  REGISTERING...
                </>
              ) : (
                "REGISTER FOR FREE"
              )}
            </button>

            <p className="text-xs text-unleash-brown/50 text-center max-w-md">
              Your information will only be used
              for UNLEASH 3.0 registration and
              event communication.
            </p>

          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;