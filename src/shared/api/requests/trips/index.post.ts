import { IParticipant } from "@base/types/IParticipant";

export interface ICreateTripRequest {
  destination: string;
  starts_at: string;
  ends_at: string;
  owner: {
    name: string;
    email: string;
  };
  emails_to_invite: string[];
}

export interface ICreateTripResponse {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
  is_confirmed: boolean;
  participants: IParticipant[];
}
