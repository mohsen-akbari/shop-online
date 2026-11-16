import React from "react";

import SignUpFormComponent from "../../../features/auth/components/sign-up-form/sign-up-form.component";

import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>
      <SignUpFormComponent />
    </div>
  );
}
