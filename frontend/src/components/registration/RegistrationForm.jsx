import { useState } from "react";
import FormField from "./FormField.jsx";
import { registerAttendee } from "../../services/registrationService.js";

const LOCCI_BRANCHES = [
  "THRONE OF MERCY, Oregun",
  "KING’S COURT ASSEMBLY, Olowoira",
  "Headquater, Alapere, ketu, Lagos",
  "MERCY CAMP, Magboro",
  "GLORY GATE Assembly, Ikorodu",
  "CITY OF MERCY, Ebute Meta",
  "MOUNTAIN OF DELIVERANCE, Ibafo",
  "ARK OF NOAH, Agege",
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
  "AKURE Branch",
  "OGBOMOSO Branch",
  "Spring of Mercy Itamaga, Ikorodu",
  "ABEOKUTA Branch",
  "CITADEL OF JUDAH, Ajah",
  "LAFIAJI Branch",
  "EJIGBO Branch",
  "ISALE-EKO Branch",
];

const AGE_GROUPS = [
  { value: "13-17", label: "13–17" },
  { value: "18-25", label: "18–25" },
  { value: "26-35", label: "26–35" },
  { value: "36-45", label: "36–45" },
  { value: "46-55", label: "46–55" },
  { value: "56+", label: "56+" },
];

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  ageGroup: "",
  city: "",
  isLocciMember: "",
  locciBranch: "",
  additionalInformation: "",
};

const validate = (formData) => {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (
    !formData.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!formData.phone) {
    errors.phone = "Please enter your phone number.";
  } else {
    const cleaned = formData.phone
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "");

    if (
      !cleaned.startsWith("0") &&
      !cleaned.startsWith("+234") &&
      !cleaned.startsWith("234")
    ) {
      errors.phone = "Please enter a valid Nigerian phone number.";
    } else if (cleaned.startsWith("0")) {
      if (!/^0[789]\d{9}$/.test(cleaned)) {
        errors.phone = "Please enter a valid Nigerian phone number.";
      }
    } else if (cleaned.startsWith("+234")) {
      if (!/^\+234[789]\d{9}$/.test(cleaned)) {
        errors.phone = "Please enter a valid Nigerian phone number.";
      }
    } else if (cleaned.startsWith("234")) {
      if (!/^234[789]\d{9}$/.test(cleaned)) {
        errors.phone = "Please enter a valid Nigerian phone number.";
      }
    }
  }

  if (!formData.ageGroup) {
    errors.ageGroup = "Please select your age group.";
  }

  if (!formData.city || formData.city.trim().length < 2) {
    errors.city = "Please enter your city or location.";
  }

  if (!formData.isLocciMember) {
    errors.isLocciMember = "Please select whether you are from LOCCI.";
  }

  if (formData.isLocciMember === "yes" && !formData.locciBranch) {
    errors.locciBranch = "Please select your LOCCI branch.";
  }

  return errors;
};

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // If user selects "No", clear the branch.
      if (name === "isLocciMember" && value === "no") {
        updated.locciBranch = "";
      }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Clear branch error when changing LOCCI membership.
    if (name === "isLocciMember" && errors.locciBranch) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.locciBranch;
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validate(formData);

    if (fieldErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
        age_group: formData.ageGroup,
        city: formData.city,
        is_locci_member: formData.isLocciMember === "yes",
        locci_branch:
          formData.isLocciMember === "yes"
            ? formData.locciBranch
            : "",
        additional_information: formData.additionalInformation,
      };

      const registrationData = await registerAttendee(payload);

      onSuccess(registrationData);
    } catch (error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
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
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-unleash-brown mb-2">
            YOUR DETAILS
          </h2>

          <p className="text-unleash-brown/70">
            Fill in your details below to register for UNLEASH 3.0.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
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

            {/* Age Group */}
            <FormField
              label="Age Group"
              name="ageGroup"
              type="select"
              value={formData.ageGroup}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.ageGroup}
              required
              options={[
                { value: "", label: "Select your age group" },
                ...AGE_GROUPS,
              ]}
            />

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

            {/* LOCCI Membership */}
            <div className="md:col-span-2">
              <FormField
                label="Are you from Love of Christ Chapel International Ministry (LOCCI)?"
                name="isLocciMember"
                type="select"
                value={formData.isLocciMember}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.isLocciMember}
                required
                options={[
                  {
                    value: "",
                    label: "Please select an option",
                  },
                  {
                    value: "yes",
                    label: "Yes, I am from LOCCI",
                  },
                  {
                    value: "no",
                    label: "No, I am not",
                  },
                ]}
              />
            </div>

            {/* LOCCI Branch */}
            {formData.isLocciMember === "yes" && (
              <div className="md:col-span-2">
                <FormField
                  label="Select Your LOCCI Branch"
                  name="locciBranch"
                  type="select"
                  value={formData.locciBranch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.locciBranch}
                  required
                  options={[
                    {
                      value: "",
                      label: "Select your branch",
                    },
                    ...LOCCI_BRANCHES.map((branch) => ({
                      value: branch,
                      label: branch,
                    })),
                  ]}
                />
              </div>
            )}

            {/* Additional Information */}
            <div className="md:col-span-2">
              <FormField
                label="Additional Information"
                name="additionalInformation"
                type="textarea"
                value={formData.additionalInformation}
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
              Your information will only be used for UNLEASH 3.0 registration
              and event communication.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
