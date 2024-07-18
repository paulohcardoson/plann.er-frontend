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
