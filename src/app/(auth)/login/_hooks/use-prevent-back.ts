import { useEffect } from "react";

/**
 * 뒤로가기 차단 훅
 * 로그인 페이지 등 보안이 필요한 페이지에서 사용
 */
export function usePreventBack() {
  useEffect(() => {
    // 현재 페이지를 히스토리에 추가 (뒤로가기 차단용)
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // 뒤로가기 시도 시 다시 앞으로 보내기
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
}
