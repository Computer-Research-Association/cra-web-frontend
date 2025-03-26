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
      const response = await authClient.get<UserListResponse>(
        `/admin/account/users/page/${page}`,
        { params: { perPage: 10 } },
      );

      const userList = response.data.resUserAdminDetailDtos || [];
      const totalPagesCount = response.data.totalPages || 0;

      setUsers(userList);
      setTotalPages(totalPagesCount);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
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
    const hasAdmin = roles.authorities.some(
      (role) => role.authority === 'ROLE_ADMIN',
    );
    const hasUser = roles.authorities.some(
      (role) => role.authority === 'ROLE_USER',
    );

    if (hasAdmin && hasUser) {
      return 'Admin';
    } else if (hasUser) {
      return 'User';
    } else {
      return roles.authorities.map((role) => role.authority).join(', '); // 기본적으로 모든 역할 표시
    }
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
            <p>학번: {user.studentId}</p>
            <p>기수: {user.term}</p>
            <p>GitHub: {user.githubId}</p>
            <p>권한: {renderUserRoles(user.roles)}</p>
            {user.greetingMessage && (
              <p className={styles.greetingMessage}>
                {`\n                나의 한마디: ${user.greetingMessage}\n              `}
              </p>
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
