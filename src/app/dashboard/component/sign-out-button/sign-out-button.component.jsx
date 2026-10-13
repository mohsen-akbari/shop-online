"use client";

import { ButtonComponent } from "@/components/button/button.component";

import MingcuteExitLine from "@/icons/MingcuteExitLine";

import styles from "./sign-out-button.module.css";

export default function SignOutButtonComponent({ openSingOutModal }) {
  return (
    <ButtonComponent className={styles.button} onClick={openSingOutModal}>
      <MingcuteExitLine />
      خروج
    </ButtonComponent>
  );
}
