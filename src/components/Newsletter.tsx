import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  async function subscribeToNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
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
      <button type="submit" className="p-3">
        <AiOutlineRight />
      </button>
    </form>
  );
};

export default Newsletter;
