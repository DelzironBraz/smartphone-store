import { ToastContainer } from "react-toastify";
import Forms from "../../components/Forms/Forms";
import { useParams } from "react-router-dom";

export default function EditPhone() {
  const { code } = useParams();
  return (
    <>
      <ToastContainer />
      <main className="w-screen h-full flex flex-col justify-start items-center mx-auto p-8">
        <Forms code={code} />
      </main>
    </>
  );
}
