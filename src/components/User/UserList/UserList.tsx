import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './UserList.module.css';
import Pagination from '~/components/Pagination/Pagination';
import { authClient } from '~/api/auth/authClient';

interface UserRole {
  authority: string;
}

interface UserRoles {
  authorities: UserRole[];
}

interface UserAdminDetailDto {
  name: string;
  email: string;
  studentId: string;
  term: string;
  githubId: string;
  greetingMessage: string;
  imgUrl: string;
  userId: number;
  roles: UserRoles;
}

interface UserListResponse {
  resUserAdminDetailDtos: UserAdminDetailDto[];
  totalPages: number;
}

export default function UserList() {
  const [users, setUsers] = useState<UserAdminDetailDto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await fetchUsers(currentPage);
      } catch (error) {
        console.error('사용자 목록 로딩 중 오류:', error);
      }
    };

    void loadUsers();
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`API 요청 시작: 페이지 ${page}`);

      const response = await authClient.get<UserListResponse>(
        `/api/admin/account/users/page/${page}`,
        { params: { perPage: 10, page: page } },
      );

      console.log('완전한 응답 객체:', response);
      console.log('응답 상태:', response.status);

      // 응답 데이터 구조 디버깅
      if (!response.data) {
        console.warn('응답 데이터가 없습니다.');
        setError('응답 데이터가 없습니다.');
        setUsers([]);
        return;
      }

      const userList = response.data.resUserAdminDetailDtos || [];
      const totalPagesCount = response.data.totalPages || 0;

      console.log('파싱된 사용자 목록:', userList);
      console.log('파싱된 총 페이지 수:', totalPagesCount);

      setUsers(userList);
      setTotalPages(totalPagesCount);
    } catch (error) {
      // 더 상세한 에러 처리
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Axios 오류:', {
          message: axiosError.message,
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        });
        setError(axiosError.message);
      } else {
        console.error('알 수 없는 오류:', error);
        setError('사용자 목록을 불러오는 중 오류가 발생했습니다.');
      }

      setUsers([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderUserRoles = (roles: UserRoles) => {
    return roles.authorities.map((role) => role.authority).join(', ');
  };

  const renderUserList = () => {
    if (isLoading) {
      return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
      return <div className={styles.error}>오류: {error}</div>;
    }

    if (!users || users.length === 0) {
      return (
        <div className={styles.noUsers}>
          사용자가 없습니다.
          <br />
          페이지나 API 설정을 확인해주세요.
        </div>
      );
    }

    return users.map((user) => (
      <div key={user.userId} className={styles.userCard}>
        <div className={styles.userInfo}>
          <img
            src={user.imgUrl || '/default-profile.png'}
            alt={`${user.name}'s profile`}
            className={styles.userImage}
          />
          <div className={styles.userDetails}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Student ID: {user.studentId}</p>
            <p>Term: {user.term}</p>
            <p>GitHub: {user.githubId}</p>
            <p>Roles: {renderUserRoles(user.roles)}</p>
            {user.greetingMessage && (
              <p className={styles.greetingMessage}>{user.greetingMessage}</p>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>사용자 목록</h2>
      <div className={styles.userList}>{renderUserList()}</div>
      <div className={styles.paginationContainer}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
