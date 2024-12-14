import { IPhone } from "../../interfaces/phone.interface";

export class MockPhoneService {
  private static phones: IPhone[] = [
    {
      model: "Galaxy 5",
      brand: "Samsung",
      price: "900",
      date: "26/04/2019",
      endDate: "12/12/2022",
      color: "BLACK",
      code: "#12212",
    },
    {
      model: "iPhone 13",
      brand: "Apple",
      price: "1200",
      date: "14/09/2021",
      endDate: "14/09/2024",
      color: "WHITE",
      code: "#33445",
    },
    {
      model: "Pixel 6",
      brand: "Google",
      price: "800",
      date: "19/10/2021",
      endDate: "19/10/2024",
      color: "BLACK",
      code: "#98765",
    },
    {
      model: "Xperia 1",
      brand: "Sony",
      price: "950",
      date: "25/05/2020",
      endDate: "25/05/2023",
      color: "BLUE",
      code: "#45678",
    },
    {
      model: "Redmi Note 10",
      brand: "Xiaomi",
      price: "700",
      date: "10/03/2021",
      endDate: "10/03/2024",
      color: "GRAY",
      code: "#12345",
    },
    {
      model: "OnePlus 9",
      brand: "OnePlus",
      price: "850",
      date: "23/03/2021",
      endDate: "23/03/2024",
      color: "PURPLE",
      code: "#54321",
    },
    {
      model: "Moto G100",
      brand: "Motorola",
      price: "600",
      date: "30/04/2021",
      endDate: "30/04/2024",
      color: "SILVER",
      code: "#67890",
    },
    {
      model: "Galaxy Z Flip 3",
      brand: "Samsung",
      price: "1000",
      date: "11/08/2021",
      endDate: "11/08/2024",
      color: "GREEN",
      code: "#09876",
    },
    {
      model: "P40 Pro",
      brand: "Huawei",
      price: "900",
      date: "26/03/2020",
      endDate: "26/03/2023",
      color: "BLACK",
      code: "#11223",
    },
    {
      model: "Zenfone 8",
      brand: "Asus",
      price: "750",
      date: "12/05/2021",
      endDate: "12/05/2024",
      color: "RED",
      code: "#33456",
    },
  ];

  static getPhones() {
    return [...this.phones];
  }

  static getPhone(code: string) {
    return this.phones.find((phone) => phone.code === code) || null;
  }

  static createPhone(phone: IPhone) {
    this.phones.push(phone);
    return {
      success: true,
      message: "Phone created successfully",
      phone,
    };
  }

  static updatePhone(phone: IPhone) {
    const index = this.phones.findIndex((p) => p.code === phone.code);
    if (index !== -1) {
      this.phones[index] = phone;
      return {
        success: true,
        message: `Phone with code ${phone.code} updated successfully`,
        phone,
      };
    }
    return {
      success: false,
      message: `Phone with code ${phone.code} not found`,
    };
  }

  static deletePhone(code: string) {
    const index = this.phones.findIndex((phone) => phone.code === code);
    if (index !== -1) {
      this.phones.splice(index, 1);
      return {
        success: true,
        message: `Phone with code ${code} deleted successfully`,
        phones: [...this.phones],
      };
    }
    return {
      success: false,
      message: `Phone with code ${code} not found`,
    };
  }
}
