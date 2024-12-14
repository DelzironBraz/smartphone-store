import { Button, IconButton } from "@mui/material";
import { MdSmartphone } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IPhone } from "../../interfaces/phone.interface";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { MockPhoneService } from "../../__mock__/phones/phones.mock";
import { PhoneService } from "../../services/phone.service";
import { toast } from "react-toastify";

interface DataTableProps {
  phones: IPhone[];
  setPhones?: (phones: IPhone[]) => void;
}

const DataTable = ({ phones, setPhones }: DataTableProps) => {
  const handleDelete = (code: string) => {
    if (import.meta.env.VITE_NODE_ENV === "test") {
      const result = MockPhoneService.deletePhone(code);
      if (result.success) {
        toast.success("Registro excluído com sucesso", {
          position: "top-right",
          autoClose: 3000,
        });
        if (result.phones) {
          setPhones?.(result.phones);
        }
      }
    } else {
      PhoneService.deletePhone(code)
        .then(() => {
          PhoneService.getPhones().then((phones) => setPhones?.(phones));
        })
        .catch((error) => {
          console.error(error);
          toast.error("Erro ao excluir registro", {
            position: "top-right",
            autoClose: 3000,
          });
        });
      toast.success("Registro excluído com sucesso", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <section className="w-full h-full mx-auto flex justify-center items-center">
      <div className="max-w-[1250px] w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
          <h4 className="font-bold text-2xl text-black">Produtos</h4>
          <Button
            className="!bg-secondary !text-black !border-black !border-solid !border !shadow-none"
            variant="contained"
            onClick={() => {
              window.location.href = "/phone/create";
            }}
            startIcon={
              <div className="flex justify-start items-center">
                <FaPlus />
                <MdSmartphone />
              </div>
            }
          >
            Adicionar
          </Button>
        </div>

        <div className="w-full">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell align="right">Modelo</TableCell>
                  <TableCell align="right">Preço</TableCell>
                  <TableCell align="right">Marca</TableCell>
                  <TableCell align="right">Cor</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phones.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell align="right">{row.model}</TableCell>
                    <TableCell align="right">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(row.price))}
                    </TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                    <TableCell align="right">{row.color}</TableCell>
                    <TableCell
                      align="right"
                      className="flex justify-center items-center"
                    >
                      <IconButton
                        onClick={() => row.code && handleDelete(row.code)}
                      >
                        <MdDelete />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          (window.location.href = `/phone/${row.code}`)
                        }
                      >
                        <HiPencil />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
