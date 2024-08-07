/**
 * @note this is created as a base for the api body. Every other API endpoint body MUST extend this. We can
 *       add more properties if we want.
 */
export interface APIEndpointBaseBody {
  sentTimes: number; // This is how many times this endpoint has been sent already. Helpful for rate limiting.
  currentTimeMS: number; // This is the time of the current time in MS. Useful for determining if person has bad wifi or not. possibly a dif algo?
}

/**
 * @note this is created as a base for the api response. Every other API endpoint response MUST extend this.
 */
export interface APIEndpointBaseResponse {
  success: boolean;
  error: ErrorBaseInterface;
}

/**
 * @note this is created as a base for the api error. Every other API endpoint error MUST extend this.
 */
export interface ErrorBaseInterface {
  exists: boolean;
  message?: string; // IK that i can make an enum... but if something goes very unexpected...
}
