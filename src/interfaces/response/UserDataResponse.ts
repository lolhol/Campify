import type { APIEndpointBaseResponse } from "../body/APIInterfacesBase";

export interface UserDataResponse extends APIEndpointBaseResponse {
  profilePicture: string;
}
