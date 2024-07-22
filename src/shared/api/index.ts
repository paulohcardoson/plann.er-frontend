import { API_URL } from "../env";
import ApiError from "./errors/ApiError";

export class API {
  public baseURL: string;

  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
  }

  private async sendRequest<T>(path: string, init?: RequestInit): Promise<T> {
    const url = new URL(path, this.baseURL);
    const response = await fetch(url, init);

    if (!response.ok) {
      const data: ApiError = await response.json();

      throw new ApiError(data.message, response.status);
    }

    const text = await response.text();

    return text.length > 0 ? JSON.parse(text) : text;
  }

  async get<T>(path: string, init?: RequestInit) {
    return await this.sendRequest<T>(path, {
      method: "GET",
      ...init,
    });
  }

  async post<T>(path: string, body: object = {}, init?: RequestInit) {
    return await this.sendRequest<T>(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...init,
    });
  }
}

const api = new API();

export default api;
