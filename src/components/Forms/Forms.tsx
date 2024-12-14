import { IPhone } from "../../interfaces/phone.interface";
import { useEffect, useState } from "react";
import { PhoneService } from "../../services/phone.service";
import { MockPhoneService } from "../../__mock__/phones/phones.mock";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import {
  formatDate,
  formatPrice,
  parsePrice,
  validateField,
} from "../../utils/form.validator";
import { toast } from "react-toastify";

interface FormsProps {
  code?: string;
}

const Forms = ({ code }: FormsProps) => {
  const [phone, setPhone] = useState<IPhone>({
    model: "",
    price: "",
    brand: "",
    color: "",
    date: "",
    endDate: "",
    code: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof IPhone, string>>>(
    {}
  );

  useEffect(() => {
    if (code) {
      if (import.meta.env.VITE_NODE_ENV === "test") {
        const mockPhone = MockPhoneService.getPhone(code);
        if (mockPhone) {
          setPhone(mockPhone);
        }
        PhoneService.getPhone(code).then((data) => {
          if (data) {
            setPhone(data);
          }
        });
      } else {
        PhoneService.getPhone(code).then((data) => setPhone(data));
      }
    }
  }, [code]);

  const handleChange = (field: keyof IPhone, value: string | number | null) => {
    const updatedPhone = { ...phone, [field]: value };
    validateField(field, value, errors, setErrors, updatedPhone);
    setPhone(updatedPhone);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const cleanedValue = value.replace(/[^\d,.-]/g, "");

    const numericValue = parseFloat(cleanedValue.replace(",", "."));

    if (!isNaN(numericValue)) {
      handleChange("price", formatPrice(numericValue.toString()));
    } else {
      handleChange("price", "");
    }
  };

  const handleSubmit = () => {
    if (phone) {
      const validPrice = parsePrice(phone.price || "");

      const updatedPhone = {
        ...phone,
        price: validPrice.toString(),
      };

      if (import.meta.env.VITE_NODE_ENV === "test") {
        const result = phone.code
          ? MockPhoneService.updatePhone(updatedPhone)
          : MockPhoneService.createPhone(updatedPhone);

        if (result.success) {
          setPhone({
            model: "",
            price: "",
            brand: "",
            color: "",
            date: "",
            endDate: "",
            code: "",
          });
          setErrors({});
          toast.success("Registro salvo com sucesso", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        if (phone.code) {
          PhoneService.updatePhone(updatedPhone)
            .then(() => {
              setPhone({
                model: "",
                price: "",
                brand: "",
                color: "",
                date: "",
                endDate: "",
                code: "",
              });
              setErrors({});
              toast.success("Registro salvo com sucesso", {
                position: "top-right",
                autoClose: 3000,
              });
            })
            .catch((error) => {
              console.error(error);
              toast.error("Erro ao salvar registro", {
                position: "top-right",
                autoClose: 3000,
              });
            });
        } else {
          PhoneService.createPhone(updatedPhone)
            .then(() => {
              setPhone({
                model: "",
                price: "",
                brand: "",
                color: "",
                date: "",
                endDate: "",
                code: "",
              });
              setErrors({});
              toast.success("Registro salvo com sucesso", {
                position: "top-right",
                autoClose: 3000,
              });
            })
            .catch((error) => {
              console.error(error);
              toast.error("Erro ao salvar registro", {
                position: "top-right",
                autoClose: 3000,
              });
            });
        }
      }
    }
  };

  return (
    <section className="w-full h-full mx-auto flex justify-center items-center">
      <div className="max-w-[600px] w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5">
          <h4 className="font-bold text-2xl text-black">Detalhes do produto</h4>
        </div>

        <div className="w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid grid-cols-2 justify-end items-end gap-5"
          >
            {/* Modelo */}
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold text-base" htmlFor="model">
                Modelo
              </label>
              <TextField
                id="model"
                variant="outlined"
                fullWidth
                value={phone.model || ""}
                onChange={(e) => handleChange("model", e.target.value)}
                inputProps={{ minLength: 2, maxLength: 255 }}
                error={!!errors.model}
                helperText={errors.model || ""}
              />
            </div>

            {/* Marca */}
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold text-base" htmlFor="brand">
                Marca
              </label>
              <TextField
                id="brand"
                variant="outlined"
                fullWidth
                value={phone.brand || ""}
                onChange={(e) => handleChange("brand", e.target.value)}
                inputProps={{ minLength: 2, maxLength: 255 }}
                error={!!errors.brand}
                helperText={errors.brand || ""}
              />
            </div>

            {/* Cor */}
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold text-base" htmlFor="color">
                Cor
              </label>
              <FormControl fullWidth error={!!errors.color}>
                <Select
                  labelId="demo-simple-select-label"
                  id="color"
                  value={phone.color || ""}
                  onChange={(e) => handleChange("color", e.target.value)}
                >
                  <MenuItem value="BLACK">Preto</MenuItem>
                  <MenuItem value="WHITE">Branco</MenuItem>
                  <MenuItem value="GOLD">Dourado</MenuItem>
                  <MenuItem value="PINK">Rosa</MenuItem>
                </Select>
                <FormHelperText>{errors.color || ""}</FormHelperText>
              </FormControl>
            </div>

            {/* Preço */}
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold text-base" htmlFor="price">
                Preço
              </label>
              <TextField
                id="price"
                variant="outlined"
                fullWidth
                value={phone.price || ""}
                onChange={handlePriceChange}
                error={!!errors.price}
                helperText={errors.price || ""}
              />
            </div>

            {/* Início das vendas */}
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold text-base" htmlFor="date">
                Início das vendas
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  fullWidth
                  format="DD/MM/YYYY"
                  value={phone.date ? formatDate(phone.date) : null}
                  onChange={(value) =>
                    handleChange(
                      "date",
                      value ? value.format("DD/MM/YYYY") : ""
                    )
                  }
                  onError={() => !!errors.date}
                  helperText={errors.date || ""}
                />
              </LocalizationProvider>
            </div>

            {/* Fim das vendas */}
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold text-base" htmlFor="endDate">
                Fim das vendas
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  fullWidth
                  format="DD/MM/YYYY"
                  value={phone.endDate ? formatDate(phone.endDate) : null}
                  onChange={(value) =>
                    handleChange(
                      "endDate",
                      value ? value.format("DD/MM/YYYY") : ""
                    )
                  }
                  onError={() => !!errors.endDate}
                  helperText={errors.endDate || ""}
                />
              </LocalizationProvider>
            </div>

            <div className="flex justify-start items-start gap-5"></div>

            <div className="flex justify-end items-center gap-5">
              <Button
                className="!bg-secondary !text-black !border-black !border-solid !border !shadow-none"
                variant="contained"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Voltar
              </Button>

              <Button
                className="!bg-secondary !text-black !border-black !border-solid !border !shadow-none"
                variant="contained"
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Forms;
