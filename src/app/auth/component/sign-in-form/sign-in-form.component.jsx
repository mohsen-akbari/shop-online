"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ColorRing } from "react-loader-spinner";

import signInImage from "@/assets/image/2.jpg";

import { ButtonComponent } from "@/components/button/button.component";
import CardComponent from "@/components/card/card.component";
import NormalInputComponent from "@/components/normal-input/normal-input.component";
import PasswordInputComponent from "@/components/password-input/password-input.component";

import FluentErrorCircle12Filled from "@/icons/FluentErrorCircle12Filled";
import MaterialSymbolsLogin from "@/icons/MaterialSymbolsLogin";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import TablerJewishStarFilled from "@/icons/TablerJewishStarFilled";

import { enTofa } from "@/utils/Utilities";
import { fetchWithToast } from "@/utils/fetch-utils";

import styles from "@/app/auth/styles/auth-form.module.css";
import Loading from "@/app/loading";

export default function SignInFormComponent() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

    if (name === "username") {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "password") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {};

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

    if (values.password.length < 6) {
      newError.password = `رمز عبور حداقل باید${enTofa(6)} کاراکتر باشد`;
      isValid = false;
      setLoading(false);
    }

    if (!values.password) {
      newError.password = "رمز عبور الزامی است";
      isValid = false;
      setLoading(false);
    }

    setErrors(newError);
    return isValid;
  };

  const router = useRouter();

  const formRef = useRef(null);

  const formSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    validateForm();
    const formData = new FormData(e.currentTarget);

    const dto = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (validateForm()) {
      const result = await fetchWithToast(
        "/api/auth/sign-in",
        {
          method: "POST",
          body: JSON.stringify(dto),
        },
        "خوش آمدید.",
      );

      if (result.error) {     
        setSubmit(false);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmit(true);
      formRef.current.reset();
      router.push("/");
    }
  };

  return (!submit ? (
    <div className={styles["auth-form"]}>
      <CardComponent>
        <div className={styles["card-content"]}>
          <div className={styles.writings}>
            <h1>ورود</h1>
            <form ref={formRef} onSubmit={formSubmitHandler}>
              <div className={styles["writings-input"]}>
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
                      <FluentErrorCircle12Filled
                        width="1.1rem"
                        height="1.1rem"
                      />
                    )}{" "}
                    <span>{errors.username}</span>
                  </div>
                )}
              </div>
              <div className={styles["writings-input"]}>
                <PasswordInputComponent
                  label="رمز عبور"
                  name="password"
                  value={values.password}
                  autoComplete="current-password"
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
                      <FluentErrorCircle12Filled
                        width="1.1rem"
                        height="1.1rem"
                      />
                    )}{" "}
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>
              <ButtonComponent variant="primary" disabled={loading}>
                {loading ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                  />
                ) : (
                  <div>
                    <MaterialSymbolsLogin width="1.6rem" height="1.6rem" />
                    <span>ورود</span>
                  </div>
                )}
              </ButtonComponent>
            </form>
            <div className={styles["change-form"]}>
              قبلاً ثبت‌نام نکردید؟
              {` `}
              <Link href="/auth/sign-up">ثبت‌نام کنید</Link>
            </div>
          </div>
          <div className={styles.visuals}>
            <Image src={signInImage} alt="" />
          </div>
        </div>
      </CardComponent>
    </div>
  ) : <Loading />
)}
