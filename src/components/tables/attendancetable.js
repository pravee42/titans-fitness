import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faHourglassStart,
  faHourglassEnd,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import "../../styles/sty.css";
import Loading from "../loading";

const Attendancetable = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [period, setPeriod] = useState(""); // New state for selected period

  const navigate = useNavigate();

  const TABLE_HEAD = [
    { label: "Customer ID", icon: faUserCircle },
    { label: "Name", icon: faUserCircle },
    { label: "Mobile No", icon: faPhone },
    { label: "In Time", icon: faHourglassStart },
    { label: "Out Time", icon: faHourglassEnd },
    { label: "Status", icon: faMoneyBill },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await Axios.get(
          "https://gym-backend-apis.onrender.com/admin/punch/out",
          { headers }
        );

        setTableData(response.data.timing);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenClick = async (customerId) => {
    try {
      const response = await Axios.get(
        `https://gym-backend-apis.onrender.com/admin/user/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const newPageUrl = `/user/${customerId}`;
      navigate(newPageUrl);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handlePeriodClick = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };

  return (
    <div className="overflow-y-auto w-full h-screen p-4 mb-10">
      {/* Period buttons */}
      <div className="mb-4">
        <button
          onClick={() => handlePeriodClick("morning")}
          className="mr-4 border rounded px-4 py-2 bg-custom-green hover:bg-green-600"
        >
          Morning
        </button>
        <button
          onClick={() => handlePeriodClick("evening")}
          className="border rounded px-4 py-2 bg-custom-green hover:bg-green-600"
        >
          Evening
        </button>
      </div>

      {/* Filter input */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by name..."
        className="p-2 border rounded mb-4"
      />

      <table className="text-center w-full border-collapse">
        <thead>
          <tr className="sticky top-0.1">
            {TABLE_HEAD.map(({ label, icon }) => (
              <th
                key={label}
                className="border border-black-800 bg-gray-50 p-4"
              >
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-green-gray-500 h-3 w-3"
                  />
                  <span className="font-normal leading-none opacity-70">
                    {label}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData
              .filter((rowData) => {
                if (!rowData.IN_TIME) {
                  return false;
                }
                const hour = parseInt(rowData.IN_TIME.slice(11, 13));
                if (period === "morning") {
                  return hour >= 6 && hour < 12;
                } else if (period === "evening") {
                  return hour >= 12 && hour <= 24;
                }
                return true;
              })

              .filter((rowData) =>
                rowData.CUSTOMER_NAME.toLowerCase().includes(
                  filter.toLowerCase()
                )
              )
              .map((rowData, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : ""
                  } border-b border-blue-gray-800`}
                >
                  <td className="p-4 border-l border-r border-blue-gray-800">
                    {rowData.CUSTOMER_PROFILE_ID}
                  </td>
                  <td className="p-4 border-l border-r border-blue-gray-800">
                    {rowData.CUSTOMER_NAME}
                  </td>
                  <td className="p-4 border-l border-r border-blue-gray-800">
                    {rowData.PHONE}
                  </td>
                  <td className="p-4 border-l border-r border-blue-gray-800">
                    {rowData.IN_TIME ? rowData.IN_TIME.slice(11, 16) : "N/A"}
                  </td>
                  <td className="p-4 border-l border-r border-blue-gray-800">
                    {rowData.OUT_TIME ? rowData.OUT_TIME.slice(11, 16) : "N/A"}
                  </td>

                  <td className="p-4 border-l border-r border-blue-gray-800 w-20">
                    <button
                      className="text-gray-800 bg-green-200 px-3 py-1 rounded-md cursor-pointer hover:bg-green-300"
                      onClick={() => handleOpenClick(rowData.CUSTOMER_PROFILE_ID)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <Loading />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendancetable;
