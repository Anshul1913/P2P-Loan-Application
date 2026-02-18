import React, { useState } from "react";
import ModalWrapper from "../../utils/modalWrapper/ModalWrapper";
import AuthApi from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const LenderRegisterModal = ({ onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    agree: false,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName) errs.fullName = "Full Name required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone || form.phone.length < 10) errs.phone = "Phone number required";
    if (!form.password || form.password.length < 6) errs.password = "Min 6 chars required";
    if (!form.agree) errs.agree = "Must accept terms";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submit Lender", form);
     const loginDTO = {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      password: form.password,
      role: "LENDER"
    };
    const response = await AuthApi.signupLender(loginDTO);

    console.log(response);
    navigate("/login");
   
  };

  return (
    <ModalWrapper title="Lender Registration" emoji="💡" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" error={errors.fullName} />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" error={errors.email} />
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" error={errors.phone} />
        <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a strong password" error={errors.password} />

        <div className="flex items-center">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="mr-2" />
          <label>I agree to the Terms of Service and Privacy Policy</label>
        </div>
        {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 rounded-md"
        >
          Start Lending
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">Sign in</a>
        </p>
      </form>
    </ModalWrapper>
  );
};

const Input = ({ name, value, onChange, placeholder, error, type = "text" }) => (
  <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:outline-none"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default LenderRegisterModal;
