import Image from "next/image";
import Link from "next/link";

import notFoundImage from "@/assets/illustrations/not-found.svg";

import LetsIconsBack from "@/icons/LetsIconsBack";

import styles from "./not-found.module.css";

export default function NotFoundShop() {
  return (
    <div className={styles["not-found"]}>
      <div className={styles.writings}>
        <div className={styles["status-code"]}>404</div>
        <h1>صفحه‌ی مورد نظر پیدا نشد!</h1>
        <p>
          صفحه یا محصولی که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده
          باشد.
        </p>
        <div className={styles["back-link"]}>
          <Link href="/products">
            <LetsIconsBack width="1.5rem" height="1.5rem" />
            <span> بازگشت به محصولات</span>
          </Link>
        </div>
      </div>
      <div className={styles.visuals}>
        <Image src={notFoundImage} alt="" width={500} height={600} />
      </div>
    </div>
  );
}
