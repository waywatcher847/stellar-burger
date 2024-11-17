import notFoundImage from "../../image/404-error.svg";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p
          className={`${styles.text} text_color_inactive text text_type_main-medium pb-4 pt-6`}
        >
          Такой страницы не существует
        </p>
        <img
          src={notFoundImage}
          alt={"404-error.svg"}
          className={styles.icon}
        />
        <p
          className={`${styles.text} text_color_inactive text text_type_main-medium pb-4 pt-6`}
        >
          Проверьте адресс или вернитесь на{" "}
          <Link to="/" className={styles.link}>
            главную страницу
          </Link>
        </p>
      </div>
    </div>
  );
}
