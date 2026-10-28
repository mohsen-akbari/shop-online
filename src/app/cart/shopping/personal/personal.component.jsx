"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import clsx from "clsx";

import banner from "@/../public/images/banner-info/b.png";
import { iranLocations } from "@/data/iran-location";

import FluentErrorCircle12Filled from "@/icons/FluentErrorCircle12Filled";
import MaterialSymbolsAppRegistration from "@/icons/MaterialSymbolsAppRegistration";
import TablerJewishStarFilled from "@/icons/TablerJewishStarFilled";

import styles from "./personal.module.css";
import "leaflet/dist/leaflet.css";

const MapPicker = dynamic(() => import("../component/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className={styles["map-loading"]}>در حال بارگذاری نقشه...</div>
  ),
});

const initialPosition = {
  lat: 36.461,
  lng: 52.804,
};

function PersonalComponent() {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    nationalCode: "",
    postalCode: "",
    phone: "",
    province: "",
    city: "",
  });

  const [position, setPosition] = useState(initialPosition);

  const [errors, setErrors] = useState({});

  const selectedProvince = iranLocations.find(
    (province) => province?.id === formData.province,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleProvinceChange = (e) => {
    const provinceId = Number(e.target.value);

    setFormData((prev) => ({
      ...prev,
      province: provinceId,
      city: "",
    }));

    setErrors((prev) => ({
      ...prev,
      province: "",
      city: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    } else if (formData.username.length < 3) {
      newErrors.username = "نام کاربری باید حداقل ۳ کاراکتر باشد";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    } else if (formData.lastName.length < 3) {
      newErrors.lastName = "نام کاربری باید حداقل ۳ کاراکتر باشد";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
    }

    if (!formData.nationalCode) {
      newErrors.nationalCode = "کد ملی الزامی است";
    } else if (!/^\d{10}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی باید ۱۰ رقم باشد";
    } else if (!isValidNationalCode(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی وارد شده معتبر نیست";
    }

    if (!formData.postalCode) {
      newErrors.postalCode = "کد پستی الزامی است";
    } else if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    }

    if (!formData.phone) {
      newErrors.phone = " شماره تلفن الزامی است";
    } else if (formData.phone.length !== 11) {
      newErrors.phone = "شماره تلفن باید ۱۱ رقم باشد";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره تلفن باید معتبر باشد";
    }

    if (!formData.province) {
      newErrors.province = "استان را انتخاب کنید";
    }

    if (!formData.city) {
      newErrors.city = "شهر را انتخاب کنید";
    }

    if (!position) {
      newErrors.location = "موقعیت خود را روی نقشه انتخاب کنید";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isValidNationalCode = (code) => {
    if (code.length !== 10) return false;

    if (/^(\d)\1{9}$/.test(code)) {
      return false;
    }

    const checkDigit = Number(code[9]);

    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += Number(code[i]) * (10 - i);
    }

    const remainder = sum % 11;

    const controlDigit = remainder < 2 ? remainder : 11 - remainder;

    return controlDigit === checkDigit;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const finalData = {
      ...formData,

      location: {
        latitude: position.lat,
        longitude: position.lng,
      },
    };

    console.log("FORM DATA:", finalData);
  };

  return (
    <div className={styles["user-form-container"]}>
      <form className={styles["user-form"]} onSubmit={handleSubmit} noValidate>
        <div className={styles["form-header"]}>
          <div className={styles.title}>
            <h2>اطلاعات کاربر</h2>
          </div>
          <div className={styles.banner}>
            <Image src={banner} alt="banner" />
          </div>
          {/* <p>اطلاعات شخصی و آدرس خود را وارد کنید</p> */}
        </div>

        <div className={styles["form-grid"]}>
          <div className={styles["form-group"]}>
            <label>
              نام کاربری
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? styles["error-input"] : ""}
            />
            <div className={styles.error}>
              {errors.username && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.username}
                </>
              )}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label>
              نام خانوادگی
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? styles["error-input"] : ""}
            />
            <div className={styles.error}>
              {errors.lastName && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.lastName}
                </>
              )}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label>
              ایمیل
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles["error-input"] : ""}
            />
            <div className={styles.error}>
              {errors.email && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.email}
                </>
              )}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label>
              کد ملی
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>

            <input
              type="text"
              name="nationalCode"
              value={formData.nationalCode}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              className={errors.nationalCode ? styles["error-input"] : ""}
            />
            <div className={styles.error}>
              {errors.nationalCode && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.nationalCode}
                </>
              )}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label>
              کد پستی
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>

            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              className={errors.postalCode ? styles["error-input"] : ""}
            />
            <div className={styles.error}>
              {errors.postalCode && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.postalCode}
                </>
              )}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label>
              شماره تلفن
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={11}
              inputMode="numeric"
              className={errors.phone ? styles["error-input"] : ""}
            />
            <div className={styles.error}>
              {errors.phone && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.phone}
                </>
              )}
            </div>{" "}
          </div>
          <div className={styles["form-group"]}>
            <label>
              استان
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>

            <select
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
            >
              <option value="">انتخاب استان</option>

              {iranLocations.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className={styles.error}>
              {errors.province && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.province}
                </>
              )}
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label>
              شهر
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!selectedProvince}
            >
              <option value="">
                {selectedProvince ? "انتخاب شهر" : "ابتدا استان را انتخاب کنید"}
              </option>

              {selectedProvince?.cities?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className={styles.error}>
              {errors.city && (
                <>
                  <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
                  {errors.city}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles["map-section"]}>
          <div className={styles["map-header"]}>
            <div>
              <h3>موقعیت مکانی</h3>

              <p>برای انتخاب موقعیت، روی نقشه کلیک کنید</p>
            </div>

            {position && (
              <div className={styles["coordinates"]}>
                <span>Lat: {position.lat.toFixed(6)}</span>

                <span>Lng: {position.lng.toFixed(6)}</span>
              </div>
            )}
          </div>

          <div
            className={clsx(
              errors.location
                ? styles["map-wrapper map-error"]
                : styles["map-wrapper"],
            )}
          >
            <MapPicker position={position} setPosition={setPosition} />
          </div>

          {errors.location && <>{errors.location}</>}
        </div>

        <div className={styles["btn-container"]}>
          <button type="submit" className={styles["submit-btn"]}>
            <MaterialSymbolsAppRegistration />
            ثبت اطلاعات
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalComponent;
