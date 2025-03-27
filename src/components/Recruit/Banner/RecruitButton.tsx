import { RefObject } from "react";
import styles from "./Banner.module.css";

interface RecruitButtonProps {
  titleRef: RefObject<HTMLDivElement>;
}

const RECRUITLINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSd-Yq9rq7tTuYXyn_RnkEvQRXP7yYVJLAWhChnPnMKtRQqrsQ/viewform';


function RecruitButton({ titleRef }: RecruitButtonProps) {
  return (
    <div ref={titleRef} className={styles["recruit-apply1"]}>
      <button className={styles["button-style"]}>모집이 마감되었습니다</button>
    </div>
  );
}

export default RecruitButton;