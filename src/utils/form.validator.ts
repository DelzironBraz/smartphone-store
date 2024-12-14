import { IPhone } from "../interfaces/phone.interface";
import dayjs from "dayjs";

export const validateField = (
  field: keyof IPhone,
  value: string | number | null,
  errors: Partial<Record<keyof IPhone, string>>,
  setErrors: (errors: Partial<Record<keyof IPhone, string>>) => void,
  phone: IPhone | null
) => {
  const newErrors: Partial<Record<keyof IPhone, string>> = { ...errors };

  switch (field) {
    case "model":
    case "brand":
      // Alfanumérico com no mínimo 2 e no máximo 255 caracteres
      if (
        !/^[a-zA-Z0-9\s]+$/.test(value as string) ||
        (value as string).length < 2 ||
        (value as string).length > 255
      ) {
        newErrors[field] =
          "Deve ser alfanumérico e ter entre 2 e 255 caracteres.";
      } else {
        delete newErrors[field];
      }
      break;

    case "price":
      // Número positivo
      if (
        !/^\d+(\.\d+)?$/.test(value as string) ||
        parseFloat(value as string) <= 0
      ) {
        newErrors[field] = "Deve ser um número real positivo.";
      } else {
        delete newErrors[field];
      }
      break;

    case "color": {
      // Lista fixa de cores
      const validColors = ["BLACK", "WHITE", "GOLD", "PINK"];
      if (!validColors.includes(value as string)) {
        newErrors[
          field
        ] = `A cor deve ser uma das seguintes opções: ${validColors.join(
          ", "
        )}`;
      } else {
        delete newErrors[field];
      }
      break;
    }

    case "date":
      // Data no formato dd/MM/yyyy
      if (!dayjs(value, "DD/MM/YYYY", true).isValid()) {
        newErrors[field] = "Data inválida. Use o formato dd/MM/yyyy.";
      } else if (dayjs(value).isBefore("2018-12-25", "day")) {
        newErrors[field] = "A data de início deve ser posterior a 25/12/2018.";
      } else {
        delete newErrors[field];
      }
      break;

    case "endDate":
      // Data no formato dd/MM/yyyy e após o início
      if (!dayjs(value, "DD/MM/YYYY", true).isValid()) {
        newErrors[field] = "Data inválida. Use o formato dd/MM/yyyy.";
      } else if (dayjs(value).isBefore(dayjs(phone?.date, "DD/MM/YYYY"))) {
        newErrors[field] = "A data de término deve ser posterior ao início.";
      } else {
        delete newErrors[field];
      }
      break;

    case "code":
      // Alfanumérico de 8 caracteres
      if (!/^[a-zA-Z0-9]{8}$/.test(value as string)) {
        newErrors[field] =
          "O código deve ser alfanumérico e ter exatamente 8 caracteres.";
      } else {
        delete newErrors[field];
      }
      break;

    default:
      break;
  }

  setErrors(newErrors);
};

export const formatDate = (date: string) => {
  return dayjs(date, "DD/MM/YYYY").isValid() ? dayjs(date, "DD/MM/YYYY") : null;
};

export const formatPrice = (price: string) => {
  const cleanedPrice = price.replace(/[^\d.-]/g, "");

  const parsedPrice = parseFloat(cleanedPrice);
  if (!isNaN(parsedPrice)) {
    return parsedPrice.toLocaleString("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return price;
};

export const parsePrice = (formattedPrice: string) => {
  return parseFloat(formattedPrice.replace(/[^\d.-]/g, ""));
};
