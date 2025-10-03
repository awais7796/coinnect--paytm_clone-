import { Appbar } from "../components/Appbar.jsx";
import { Users } from "../components/Users.jsx";
import Balance from "../components/Balance.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  // Local state to hold the latest numeric balance for the logged-in user
  const [balance, setBalance] = useState(null);

  // Fetch the user's balance from the backend on initial render
  // Any time you navigate back to this page (e.g., after a transfer), this will re-run
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        // Backend returns { balance: number }
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Failed to fetch balance", err.response?.data || err);
        setBalance(null);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        {/* Show the fetched balance, or a fallback placeholder while loading */}
        <Balance value={balance ?? "-"} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
