import { ReactElement } from "react";

import Image from "next/image";
import Link from "next/link";

import enamd from "@/assets/logo/Enamad-Logo-1030x1030.webp";
import c4 from "@/assets/logo/c4.webp";
import certificateLogo from "@/assets/logo/certificate.svg";
import enamadLogo from "@/assets/logo/enamad.svg";
import idkLogo from "@/assets/logo/idk.svg";
import samandehi from "@/assets/logo/samandehi.webp";

import MingcuteLinkedinFill from "@/icons/MingcuteLinkedinFill";
import MingcuteTelegramFill from "@/icons/MingcuteTelegramFill";
import MingcuteYoutubeFill from "@/icons/MingcuteYoutubeFill";

import styles from "./footer.module.css";

export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className={styles.writings}>
        <div className={styles.logo}>فروشگاه لاوین</div>
        <p className={styles.description}>
          بزرگترین فروشگاه آنلاین خرید گوشی همراه در ایران
        </p>
      </div>
      <div className={styles.visuals}>
        <ul className={styles.certificates}>
          <li>
            <Link href="#">
              <Image src={enamd} alt="Logo" width={70} height={70} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image src={samandehi} alt="Logo" width={70} height={70} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image src={c4} alt="Logo" width={70} height={70} />
            </Link>
          </li>
        </ul>
        <ul className={styles.socials}>
          <li>
            <Link href="#" target="_blank" className={styles.telegram}>
              <MingcuteTelegramFill width="2rem" height="2rem" />
            </Link>
          </li>
          <li>
            <Link href="#" target="_blank" className={styles.linkedin}>
              <MingcuteLinkedinFill width="2.2rem" height="2rem" />
            </Link>
          </li>
          <li>
            <Link href="#" target="_blank" className={styles.youtube}>
              <MingcuteYoutubeFill width="2.5rem" height="2rem" />
            </Link>
          </li>
        </ul>
      </div>
      <p className={styles.copy}>
        تمامی حقوق مادی و معنوی این وب‌سایت، خدمات و محتوای مربوط به آن متعلق به
        من می‌باشد!
      </p>
    </footer>
  );
}
