import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '~/store/userStore';
import { uploadProfileImage, changeUserProfileImage } from '~/api/user.ts';
import styles from '../UserPage.module.css';

function UserImage() {
  const navigate = useNavigate();
  const { name, imgUrl, setUser } = useUserStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadProfileImage(file);

      setPreviewUrl(URL.createObjectURL(file));
      setUploadedUrl(url);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleConfirm = async () => {
    // TODO: 모달로 변경 해야됨
    if (!uploadedUrl) return alert('이미지를 먼저 업로드하세요.');

    try {
      const finalImageUrl = await changeUserProfileImage(uploadedUrl);

      setUser({ imgUrl: finalImageUrl });
      setPreviewUrl(null);
      setUploadedUrl(null);
      void navigate(`/user/${name}`);
    } catch (error) {
      setUser({ imgUrl: '' });
      console.error('프로필 이미지 변경 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 사진 수정</div>
      <div className={styles.image}>
        <img
          src={previewUrl || imgUrl}
          alt="유저 이미지"
          className={styles.preview}
        />
      </div>
      {/* 'accept="image/*" 를 사용하여 이미지 파일만 업로드 가능하게 함' */}
      <div className={styles.buttons}>
        {/* 숨겨진 file input */}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className={styles.fileUpload}
          onChange={handleImageChange}
        />
        {/* label을 클릭하면 file input 실행 */}
        <label htmlFor="file-upload" className={styles.fileLabel}>
          이미지 선택
        </label>
        <button onClick={handleConfirm} className={styles.confirmbutton}>
          확인
        </button>
      </div>
    </div>
  );
}

export default UserImage;
