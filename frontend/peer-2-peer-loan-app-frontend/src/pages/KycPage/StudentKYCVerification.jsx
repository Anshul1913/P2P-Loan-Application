import React, { useState, useEffect } from "react";
import JSConfetti from "js-confetti";
import UploadImage from "../../assets/Screenshot_2025-07-31_235115-removebg-preview.png"; // Adjust path as necessary
import KycVerificationApi from "../../services/KycVerificationService";
import KycDocumentDTO from "../../dtos/KycDocumentDTO";
import { useNavigate } from "react-router-dom";
const jsConfetti = new JSConfetti();

const StudentKYCVerification = () => {
  const navigate = useNavigate();
  // Form states
  const [form, setForm] = useState({
    panNumber: "",
    aadhaar1: "",
    aadhaar2: "",
    aadhaar3: "",
    panFile: null,
    aadhaarFile: null,
    selfieFile: null,
    kycStatus: "PENDING",
    isVerified: false,
    id: "", // Example ID, replace with actual logic to get user ID
  });

  // Error states
  const [errors, setErrors] = useState({});

  // File previews
  const [panPreview, setPanPreview] = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      panPreview && URL.revokeObjectURL(panPreview);
      aadhaarPreview && URL.revokeObjectURL(aadhaarPreview);
      selfiePreview && URL.revokeObjectURL(selfiePreview);
    };
  }, [panPreview, aadhaarPreview, selfiePreview]);

  useEffect(() => {
    checkDocumentIsExist();
  }, []);

  const checkDocumentIsExist = async () => {
    try {
      const response = await KycVerificationApi.checkDocumentIsExist();
      console.log("KYC Document Existence Check:", response);
      if (response == true) {
        navigate("/student-dashboard");
      }
      // setForm((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.error("Error checking KYC document existence:", error);
    }
  };

  // Form input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedForm = { ...form };

    if (files) {
      const file = files[0];
      updatedForm[name] = file;
      const previewUrl = URL.createObjectURL(file);
      if (name === "panFile") setPanPreview(previewUrl);
      if (name === "aadhaarFile") setAadhaarPreview(previewUrl);
      if (name === "selfieFile") setSelfiePreview(previewUrl);
    } else {
      updatedForm[name] = value;
    }

    setForm(updatedForm);
    validateOnChange(updatedForm, name);
  };

  const validateOnChange = (updatedForm, fieldName) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "panNumber":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(updatedForm.panNumber)) {
          newErrors.panNumber = "Invalid PAN format";
        } else {
          delete newErrors.panNumber;
        }
        break;

      case "aadhaar1":
      case "aadhaar2":
      case "aadhaar3":
        if (!/^\d{4}$/.test(updatedForm[fieldName])) {
          newErrors[fieldName] = "4 digits required";
        } else {
          delete newErrors[fieldName];
        }
        break;

      case "panFile":
        if (!updatedForm.panFile) {
          newErrors.panFile = "PAN card image is required";
        } else {
          delete newErrors.panFile;
        }
        break;

      case "aadhaarFile":
        if (!updatedForm.aadhaarFile) {
          newErrors.aadhaarFile = "Aadhaar card image is required";
        } else {
          delete newErrors.aadhaarFile;
        }
        break;

      case "selfieFile":
        if (!updatedForm.selfieFile) {
          newErrors.selfieFile = "Selfie image is required";
        } else {
          delete newErrors.selfieFile;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNumber)) {
      newErrors.panNumber = "Invalid PAN format";
    }

    if (!/^\d{4}$/.test(form.aadhaar1))
      newErrors.aadhaar1 = "4 digits required";
    if (!/^\d{4}$/.test(form.aadhaar2))
      newErrors.aadhaar2 = "4 digits required";
    if (!/^\d{4}$/.test(form.aadhaar3))
      newErrors.aadhaar3 = "4 digits required";

    if (!form.panFile) newErrors.panFile = "PAN card image is required";
    if (!form.aadhaarFile)
      newErrors.aadhaarFile = "Aadhaar card image is required";
    if (!form.selfieFile) newErrors.selfieFile = "Selfie image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const aadhaarNumber = form.aadhaar1 + form.aadhaar2 + form.aadhaar3;
    console.log(aadhaarNumber);

    try {
      const response = await KycVerificationApi.verifyKycStudent(
        form,
        aadhaarNumber
      );
      console.log("Kyc upload successful:", response);

      jsConfetti.addConfetti({
        emojis: ["🎉", "🚀", "🌟"],
        confettiNumber: 150,
      });

      navigate("/student-dashboard");
    } catch (error) {
      console.log("Kyc upload failed:", error);
    }
  };

  return (
    <div>
      <div className="rounded-xl shadow-md  max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Let’s Get You Verified, Superstar ⭐
        </h2>
        <p className="text-gray-600">
          Your Journey to smarter Lending starts with a quick selfie and a few
          clicks!
        </p>
      </div>
      <div className="max-w-4xl mx-auto p-8 grid lg:grid-cols-2 gap-8 font-poppins">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          {/* PAN Number */}
          <div>
            <label className="block mb-1 font-medium">PAN Number</label>
            <input
              name="panNumber"
              value={form.panNumber}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              className={`w-full p-3 border rounded-lg transition focus:outline-none  ${
                errors.panNumber
                  ? "border-red-500 animate-shake"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500 "
              }`}
            />
            <p className="mt-1 text-red-500 text-sm">{errors.panNumber}</p>
          </div>

          {/* Aadhaar Inputs */}
          <div>
            <label className="block mb-1 font-medium">Aadhaar Number</label>
            <div className="flex items-center space-x-2  justify-around">
              {["aadhaar1", "aadhaar2", "aadhaar3"].map((field, idx) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  maxLength={4}
                  onChange={handleChange}
                  inputMode="numeric"
                  className={`w-16 p-3 text-center border focus:outline-none rounded-lg transition ${
                    errors[field]
                      ? "border-red-500 animate-shake"
                      : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  }`}
                  onKeyUp={(e) => {
                    if (e.target.value.length === 4 && idx < 2) {
                      const next = e.target.nextElementSibling;
                      if (next) next.focus();
                    }
                  }}
                />
              ))}
            </div>
            <p className="mt-1 text-red-500 text-sm">
              {errors.aadhaar1 || errors.aadhaar2 || errors.aadhaar3}
            </p>
          </div>

          {/* PAN Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload PAN Card</label>
            <div
              className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center cursor-pointer hover:border-indigo-400 transition-colors"
              onClick={() => document.getElementById("panFile").click()}
            >
              <p className="text-gray-500">Drag & Drop or Click to upload</p>
              <input
                id="panFile"
                name="panFile"
                type="file"
                accept="image/*,.pdf"
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <p className="mt-1 text-red-500 text-sm">{errors.panFile}</p>
            {panPreview && (
              <img
                src={panPreview}
                className="mt-4 h-32 object-contain rounded-lg"
              />
            )}
          </div>

          {/* Aadhaar Upload */}
          <div>
            <label className="block mb-1 font-medium">
              Upload Aadhaar Card
            </label>
            <div
              className="border-2 border-dashed border-gray-300 p-6 rounded-xl hover:border-indigo-400"
              onClick={() => document.getElementById("aadhaarFile").click()}
            >
              {/* <div className=" -top-4 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs rounded"> */}
              <p className="text-gray-500">Drag & Drop or Click to upload</p>
            </div>
            <input
              id="aadhaarFile"
              name="aadhaarFile"
              type="file"
              accept="image/*,.pdf"
              onChange={handleChange}
              className="hidden"
            />
            {/* </div> */}
            <p className="mt-1 text-red-500 text-sm">{errors.aadhaarFile}</p>
            {aadhaarPreview && (
              <img
                src={aadhaarPreview}
                className="mt-4 h-32 object-contain rounded-lg"
              />
            )}
          </div>

          {/* Selfie Upload */}
          <div>
            <label className="block mb-1 font-medium">
              Upload Selfie with ID
            </label>
            <div
              className="flex items-center justify-center border border-gray-300 p-4 rounded-full w-32 h-32 mx-auto hover:border-indigo-400 cursor-pointer transition-colors"
              onClick={() => document.getElementById("selfieFile").click()}
            >
              {selfiePreview ? (
                <img
                  src={selfiePreview}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-300 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M8 21h8a2 2 0 002-2v-5a2 2 0 00-2-2h-3l-1-2-1 2H8a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
              )}
              <input
                id="selfieFile"
                name="selfieFile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
            <p className="mt-1 text-red-500 text-sm">{errors.selfieFile}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 mt-4 text-white font-semibold rounded-lg transition ${
              Object.keys(errors).length === 0 &&
              form.panNumber &&
              form.aadhaar1 &&
              form.aadhaar2 &&
              form.aadhaar3 &&
              form.panFile &&
              form.aadhaarFile &&
              form.selfieFile
                ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            💥 Verify Me
          </button>
        </form>

        {/* Right Section: Status and Tips (unchanged) */}
        <aside className="space-y-6">
          {/* Status Card */}
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
            <div className="h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center text-4xl animate-pulse">
              ⏳
            </div>
            <h3 className="mt-4 text-xl font-semibold">Pending Verification</h3>
            <p className="text-gray-600 text-center px-4">
              Hang tight! We’re reviewing your documents now.
            </p>
          </div>

          {/* Progress Bar */}
          {/* <div className="p-6 bg-white rounded-xl shadow-lg">
          <h4 className="font-medium mb-2">Progress</h4>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  i <= 2 ? 'bg-teal-400 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
        </div> */}

          {/* Tips */}
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h4 className="font-medium mb-3">How to Get Verified Faster</h4>
            <ul className="space-y-2 text-gray-600">
              <li>📸 Use a clear, glare-free photo of your ID.</li>
              <li>🖼️ Ensure all four corners of the document are visible.</li>
              <li>💡 Take your selfie in good lighting.</li>
            </ul>
            <button className="mt-4 text-indigo-500 hover:underline">
              Need Help?
            </button>
          </div>

          <div className="pt-6">
            <img
              src={UploadImage} // Replace with actual image import
              alt="Student"
              className="w-full max-w-xs md:max-w-sm"
            />
            <p className="text-xl font-semibold text-center mt-4">
              🔒 Your documents are safe with us
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default StudentKYCVerification;
