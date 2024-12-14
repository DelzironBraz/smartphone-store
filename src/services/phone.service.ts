import { IPhone } from "../interfaces/phone.interface";

export class PhoneService {
  static async getPhones() {
    return fetch(`${import.meta.env.VITE_BASE_URL}/phone`, {
      headers: {
        cpf: import.meta.env.VITE_SOCIAL_NUMBER,
      },
    }).then((res) => res.json());
  }

  static async getPhone(code: string) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/phone/${code}`, {
      headers: {
        cpf: import.meta.env.VITE_SOCIAL_NUMBER,
      },
    }).then((res) => res.json());
  }

  static async createPhone(phone: IPhone) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cpf: import.meta.env.VITE_SOCIAL_NUMBER,
      },
      body: JSON.stringify(phone),
    }).then((res) => res.json());
  }

  static async updatePhone(phone: IPhone) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/phone/${phone.code}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cpf: import.meta.env.VITE_SOCIAL_NUMBER,
      },
      body: JSON.stringify(phone),
    }).then((res) => res.json());
  }

  static async deletePhone(code: string) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/phone/${code}`, {
      method: "DELETE",
      headers: {
        cpf: import.meta.env.VITE_SOCIAL_NUMBER,
      },
    }).then((res) => res.json());
  }
}
