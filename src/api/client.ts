import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://exchange-example.switchflow.biz";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    // 에러 메시지 추출
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "요청 처리 중 오류가 발생했습니다.";

    // 401: 인증 실패
    if (error.response?.status === 401) {
      Cookies.remove("authToken");
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // 그 외 에러: alert 표시
    alert(errorMessage);
    return Promise.reject(error);
  }
);
