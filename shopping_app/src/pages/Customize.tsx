import { useEffect } from "react";

const Customize = () => {
  useEffect(() => {
    fetch("http://localhost:5000/run_app")
      .then((res) => res.json())
      .then((data) => {
        console.log("Stable Diffusion triggered:", data);
      })
      .catch((err) => {
        console.error("Failed to start backend:", err);
      });
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center text-2xl text-gray-700">
      Stable Diffusion is starting...
    </div>
  );
};

export default Customize;
