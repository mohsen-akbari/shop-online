import { forwardRef } from "react";

import clsx from "clsx";

import { ButtonComponent } from "@/components/button/button.component";

import styles from "./normal-input.module.css";

function NormalInputComponent(
  {
    label,
    prefixIcon0,
    prefixIcon,
    suffixIcon,
    onSuffixClick,
    className,
    error,
    ...otherProps
  },
  ref,
) {
  return (
    <label className={clsx(styles["normal-input"], className)}>
      <div className={styles["label-text"]}>
        <span>{label}</span>
        {prefixIcon0 && (
          <div className={styles["prefix-icon"]}>{prefixIcon0}</div>
        )}
      </div>
      <div
        className={clsx(styles.box)}
        style={{ border: error && "1px solid red", color: error && "red" }}
      >
        {prefixIcon && (
          <div className={styles["prefix-icon"]}>{prefixIcon}</div>
        )}
        <input ref={ref} placeholder="" {...otherProps} />
        {suffixIcon && (
          <ButtonComponent
            type="button"
            shape="inherit"
            onClick={onSuffixClick}
          >
            <div className={styles["suffix-icon"]}>{suffixIcon}</div>
          </ButtonComponent>
        )}
      </div>
    </label>
  );
}

export default forwardRef(NormalInputComponent);
