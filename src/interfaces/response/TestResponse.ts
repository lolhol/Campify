import type { APIEndpointBaseResponse } from "../body/APIInterfacesBase";

export interface TestResponse extends APIEndpointBaseResponse {
  testSuccess: boolean;
  testMessage: string;
}
