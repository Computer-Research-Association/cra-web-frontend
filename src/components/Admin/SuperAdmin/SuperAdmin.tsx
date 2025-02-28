import { useState } from 'react';
import { getSignUpCodes, SignUpCode } from '~/api/admin';
import { QUERY_KEY } from '~/api/queryKey';
import { useQuery } from '@tanstack/react-query';
import styles from './SuperAdmin.module.css';

function SuperAdmin() {
  const [length, setLength] = useState(1);

  const { data, isFetching, refetch } = useQuery<SignUpCode[]>({
    queryKey: QUERY_KEY.signUpCode.signUpCode(length),
    queryFn: () => getSignUpCodes(length),
    enabled: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>가입 코드 생성</div>
      <div className={styles.input}>
        <input
          type="text"
          value={length}
          onChange={(e) => {
            const newValue = e.target.value;

            if (/^\d*$/.test(newValue)) {
              const numValue = Number(newValue);

              if (newValue === '' || (numValue >= 1 && numValue <= 20)) {
                setLength(newValue === '' ? 0 : numValue);
              }
            }
          }}
        />
      </div>
      <div className={styles.button}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '생성 중...' : '생성하기'}
        </button>
      </div>
      <div className={styles.codeList}>
        {data?.map((item, index) => (
          <div key={index} className={styles.code}>
            {++index}. {item.code}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuperAdmin;
