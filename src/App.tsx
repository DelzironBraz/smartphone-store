import { useEffect, useState } from "react";
import "./App.css";
import { PhoneService } from "./services/phone.service";
import { IPhone } from "./interfaces/phone.interface";
import { MockPhoneService } from "./__mock__/phones/phones.mock";
import DataTable from "./components/DataTable/DataTable";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [phones, setPhones] = useState<IPhone[]>([]);

  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV === "test") {
      const mockPhones = MockPhoneService.getPhones();
      setPhones(mockPhones);
    } else {
      PhoneService.getPhones().then((phones) => setPhones(phones));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <main className="w-screen h-full flex flex-col justify-start items-center mx-auto p-8">
        <DataTable phones={phones} setPhones={setPhones} />
      </main>
    </>
  );
}
