"use client";

import React, { useEffect, useState } from "react";

import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

import { ButtonComponent } from "@/components/button/button.component";
import CardComponent from "@/components/card/card.component";
import NormalInputComponent from "@/components/normal-input/normal-input.component";
import PasswordInputComponent from "@/components/password-input/password-input.component";

import FluentErrorCircle12Filled from "@/icons/FluentErrorCircle12Filled";
import MaterialSymbolsBoxEditOutlineRounded from "@/icons/MaterialSymbolsBoxEditOutlineRounded";
import MingcuteIncognitoModeLine from "@/icons/MingcuteIncognitoModeLine";
import MingcuteMailLine from "@/icons/MingcuteMailLine";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import TablerJewishStarFilled from "@/icons/TablerJewishStarFilled";

import { enTofa } from "@/utils/Utilities";
import { fetchWithToast } from "@/utils/fetch-utils";

import ProductSkeleton from "../skeleton/ProfileFormSkeleton";
import ProfileFormSkeleton from "../skeleton/ProfileFormSkeleton";

import styles from "./profile-form.module.css";

export default function ProfileFormComponent() {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("pending");
  const [data, setData] = useState(null);

  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState();

  const fetchProfile = async () => {
    const result = await fetchWithToast("/api/dashboard/profile");

    if (result.error) {
      setStatus("error");
      return;
    }

    setData(result.data);
    setValues(result.data);
    setStatus("success");
  };

  useEffect(() => {
    fetchProfile().then();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((old) => ({ ...old, [name]: value }));

    if (name === "name") {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "username") {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "email") {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "password") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {};

    if (/^[A-Za-z\s]*$/gim.test(values.name) === false) {
      newError.name = `نام و نام خانوادگی فقط دارای حرف باشد`;
      isValid = false;
      setLoading(false);
    }

    if (values.name.length < 5) {
      newError.name = `نام کاربری حداقل باید ${enTofa(5)} کاراکتر باشد`;
      isValid = false;
      setLoading(false);
    }

    if (!values.name) {
      newError.name = "نام و نام خانوادگی الزامی است";
      isValid = false;
      setLoading(false);
    }

    if (/^(?=.*[a-z]{2,})/gim.test(values.username) === false) {
      newError.username = `نام کاربری حداقل دارای دو حرف باشد`;
      isValid = false;
      setLoading(false);
    }

    if (values.username.length < 3) {
      newError.username = `نام کاربری حداقل باید${enTofa(3)} کاراکتر باشد`;
      isValid = false;
      setLoading(false);
    }

    if (!values.username) {
      newError.username = "نام کاربری الزامی است";
      isValid = false;
      setLoading(false);
    }

    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/g.test(
        values.email,
      ) === false
    ) {
      newError.email = `فرمت ایمیل نادرست است`;
      isValid = false;
      setLoading(false);
    }

    if (!values.email) {
      newError.email = "ایمیل الزامی است";
      isValid = false;
      setLoading(false);
    }

    if (values.password?.length > 0) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g.test(
          values.password,
        ) === false
      ) {
        newError.password = `رمز عبور باید شامل حروف کوچک و بزرگ و اعداد و کاراکترهای ویژه باشد`;
        isValid = false;
        setLoading(false);
      }

      if (values.password.length < 8) {
        newError.password = `رمز عبور حداقل باید${enTofa(8)} کاراکتر باشد`;
        isValid = false;
        setLoading(false);
      }
    }

    if (!values.password) {
      newError.password = "پسورد الزامی است";
      isValid = false;
      setLoading(false);
    }

    setErrors(newError);
    return isValid;
  };

  const formSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    validateForm();

    if (validateForm()) {
      if (JSON.stringify(data) !== JSON.stringify(values)) {
        const result = await fetchWithToast(
          "/api/dashboard/profile",
          {
            method: "PATCH",
            body: JSON.stringify(values),
          },
          "ویرایش با موفقیت انجام شد.",
        );

        if (result.error) {
          setLoading(false);
          return;
        }

        setLoading(false);
        setSubmit(true);
      } else {
        toast.error("هیچ تغییری انجام شد!");
        setLoading(false);
      }
    }
  };

  if (status === "pending") {
    return (
      <ProfileFormSkeleton />
      // <div className={styles["loading-container"]}>
      //   <ColorRing
      //     visible={true}
      //     height="70"
      //     width="70"
      //     ariaLabel="color-ring-loading"
      //     wrapperStyle={{}}
      //     wrapperClass="color-ring-wrapper"
      //     colors={["#3167f1", "#3167f1", "#3167f1", "#3167f1", "#3167f1"]}
      //   />
      // </div>
    );
  }

  if (status === "error") {
    return <h1>متاسفانه مشکلی پیش امده است!</h1>;
  }

  return (
    <CardComponent className={styles["profile-form"]}>
      <h1>ویرایش پروفایل</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <NormalInputComponent
            label="نام و نام خانوادگی"
            type="text"
            name="name"
            value={values.name}
            maxLength="30"
            prefixIcon0={
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            }
            prefixIcon={<MingcuteIncognitoModeLine />}
            onChange={handleInputChange}
            error={errors.name}
          />
          {errors && (
            <div className={styles.error}>
              {errors.name && (
                <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
              )}{" "}
              <span>{errors.name}</span>
            </div>
          )}
        </div>
        <div>
          <NormalInputComponent
            label="نام کاربری"
            type="text"
            name="username"
            value={values.username}
            maxLength="20"
            prefixIcon0={
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            }
            prefixIcon={<MingcuteUser3Line />}
            onChange={handleInputChange}
            error={errors.username}
          />
          {errors && (
            <div className={styles.error}>
              {errors.username && (
                <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
              )}{" "}
              <span>{errors.username}</span>
            </div>
          )}
        </div>
        <div>
          <NormalInputComponent
            label="ایمیل"
            type="text"
            name="email"
            value={values.email}
            maxLength="40"
            prefixIcon0={
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            }
            prefixIcon={<MingcuteMailLine />}
            onChange={handleInputChange}
            error={errors.email}
          />
          {errors && (
            <div className={styles.error}>
              {errors.email && (
                <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
              )}{" "}
              <span>{errors.email}</span>
            </div>
          )}
        </div>
        <div>
          <PasswordInputComponent
            label="رمز عبور"
            name="password"
            autoComplete="new-password"
            value={values.password}
            maxLength="20"
            prefixIcon0={
              <TablerJewishStarFilled
                width="0.8rem"
                height="0.6rem"
                color="#c90707"
              />
            }
            onChange={handleInputChange}
            error={errors.password}
          />
          {errors && (
            <div className={styles.error}>
              {errors.password && (
                <FluentErrorCircle12Filled width="1.1rem" height="1.1rem" />
              )}{" "}
              <span>{errors.password}</span>
            </div>
          )}
        </div>
        <div className={styles["btn-container"]}>
          <ButtonComponent
            variant=""
            shape=""
            disabled={loading}
            className={styles["btn-edit"]}
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              <>
                <MaterialSymbolsBoxEditOutlineRounded
                  width="1.3rem"
                  height="1.3rem"
                />
                <span>ذخیره</span>
              </>
            )}
          </ButtonComponent>
        </div>
      </form>
    </CardComponent>
  );
}
