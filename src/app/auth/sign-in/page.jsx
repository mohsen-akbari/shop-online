import React from "react";

import SignInFormComponent from "../../../features/auth/components/sign-in-form/sign-in-form.component";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <SignInFormComponent />
    </div>
  );
}
