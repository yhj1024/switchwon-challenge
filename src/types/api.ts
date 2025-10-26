/**
 * API 공통 응답 구조
 */
export interface ApiResponse<T = unknown> {
  /**
   * 응답 코드
   */
  code: string;
  /**
   * 응답 메시지
   */
  message: string;
  /**
   * 응답 데이터
   */
  data?: T;
}
