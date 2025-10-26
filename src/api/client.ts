import axios from "axios";
import Cookies from "js-cookie";

/**
 * API 기본 URL
 */
const API_BASE_URL = "https://exchange-example.switchflow.biz";

/**
 * Axios 인스턴스
 * @description 서버/클라이언트 양쪽에서 사용 가능한 API 클라이언트
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add auth token (클라이언트에서만)
apiClient.interceptors.request.use(
  (config) => {
    // 클라이언트 환경에서만 쿠키에서 토큰 가져오기
    if (typeof window !== "undefined") {
      const token = Cookies.get("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // 서버 환경에서는 각 fetch 함수에서 직접 헤더 설정
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401: 인증 실패 (클라이언트 환경에서만 처리)
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("authToken");
      window.location.href = "/login";
    }

    // 에러는 각 컴포넌트에서 처리하도록 reject
    return Promise.reject(error);
  }
);
