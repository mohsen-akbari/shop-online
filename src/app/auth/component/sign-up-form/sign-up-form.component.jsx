"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ColorRing } from "react-loader-spinner";

import signUpImage from "@/assets/image/1.jpg";

import { ButtonComponent } from "@/components/button/button.component";
import CardComponent from "@/components/card/card.component";
import NormalInputComponent from "@/components/normal-input/normal-input.component";
import PasswordInputComponent from "@/components/password-input/password-input.component";

import FluentErrorCircle12Filled from "@/icons/FluentErrorCircle12Filled";
import MaterialSymbolsLogin from "@/icons/MaterialSymbolsLogin";
import MingcuteIncognitoModeLine from "@/icons/MingcuteIncognitoModeLine";
import MingcuteMailLine from "@/icons/MingcuteMailLine";
import MingcuteUser3Line from "@/icons/MingcuteUser3Line";
import StreamlineInterfaceUserAddActionsAddCloseGeometricHumanPersonPlusSingleUpUser from "@/icons/StreamlineInterfaceUserAddActionsAddCloseGeometricHumanPersonPlusSingleUpUser";
import TablerJewishStarFilled from "@/icons/TablerJewishStarFilled";

import { enTofa } from "@/utils/Utilities";
import { fetchWithToast } from "@/utils/fetch-utils";

import styles from "@/app/auth/styles/auth-form.module.css";
import Loading from "@/app/loading";

export default function SignUpFormComponent() {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });

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
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (validateForm()) {
      const result = await fetchWithToast(
        "/api/auth/sign-up",
        {
          method: "POST",
          body: JSON.stringify(dto),
        },
        "ثبت نام با موفقیت انجام شد.",
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

  return (!submit ?(
    <div className={styles["auth-form"]}>
      <CardComponent>
        <div className={styles["card-content"]}>
          <div className={styles.writings}>
            <h1>ثبت‌نام</h1>
            <form ref={formRef} onSubmit={formSubmitHandler}>
              <div className={styles["writings-input"]}>
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
                      <FluentErrorCircle12Filled
                        width="1.1rem"
                        height="1.1rem"
                      />
                    )}{" "}
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
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
                      <FluentErrorCircle12Filled
                        width="1.1rem"
                        height="1.1rem"
                      />
                    )}{" "}
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
              <div className={styles["writings-input"]}>
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
                    <StreamlineInterfaceUserAddActionsAddCloseGeometricHumanPersonPlusSingleUpUser
                      width="1.3rem"
                      height="1.3rem"
                    />
                    <span>ثبت نام</span>
                  </div>
                )}
              </ButtonComponent>{" "}
            </form>
            <div className={styles["change-form"]}>
              قبلاً ثبت‌نام کردید؟
              {` `}
              <Link href="/auth/sign-in">وارد شوید</Link>
            </div>
          </div>
          <div className={styles.visuals}>
            <Image src={signUpImage} alt="" />
          </div>
        </div>
      </CardComponent>
    </div>
  ): <Loading />)
}
