/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useAuthStore } from '~/store/authStore';

const serverApi = import.meta.env.VITE_API_BASE_URL as string;
const { accessToken } = useAuthStore.getState();
const SwaggerUIComponent: React.FC = () => {
  const [swaggerUrl, setSwaggerUrl] = useState<string>('');

  useEffect(() => {
    // Spring Boot 서버에서 OpenAPI JSON 경로를 설정
    setSwaggerUrl(serverApi + '/backend-api-data');
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {swaggerUrl ? (
        <SwaggerUI
          url={swaggerUrl}
          requestInterceptor={(req) => {
            if (accessToken) {
              req.headers.Authorization = `Bearer ${accessToken}`;
            }
            return req;
          }}
        />
      ) : (
        <p>Loading Swagger...</p>
      )}
    </div>
  );
};

export default SwaggerUIComponent;
