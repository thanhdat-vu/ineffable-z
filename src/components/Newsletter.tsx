import { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function subscribeToNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const { success } = await res.json();
    if (success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
    setEmail("");
  }

  if (status != "") {
    return (
      <div
        className={`mt-6 | w-80 sm:w-96 flex items-center mx-auto text-green-500 bg-white 
          ${status == "success" && "text-green-500"}
          ${status == "error" && "text-red-500"}
        `}
      >
        <div className="p-3 grow text-left">
          {status == "success" && "Welcome! You are a member of the group."}
          {status == "error" && "Please enter valid email address!"}
        </div>
        <button
          type="submit"
          className="p-4 font-bold hover:bg-gray-200"
          onClick={() => setStatus("")}
        >
          {status == "success" && <AiOutlineCheck />}
          {status == "error" && <AiOutlineClose />}
        </button>
      </div>
    );
  }

  return (
    <form
      className="mt-6 | w-80 sm:w-96 flex items-center mx-auto text-rich-black bg-white"
      onSubmit={subscribeToNewsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email here!"
        className="grow p-3 outline-0"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        required
      />
      <button type="submit" className="p-4 hover:bg-gray-200">
        <AiOutlineRight />
      </button>
    </form>
  );
};

export default Newsletter;
