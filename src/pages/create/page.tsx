import { ToastContainer } from "react-toastify";
import Forms from "../../components/Forms/Forms";

export default function CreatePhone() {
  return (
    <>
      <ToastContainer />
      <main className="w-screen h-full flex flex-col justify-start items-center mx-auto p-8">
        <Forms />
      </main>
    </>
  );
}
