import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhone, faCalendarAlt, faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@material-tailwind/react";
import Axios from "axios";
import "../../styles/sty.css";
import Loading from '../loading';

const Tablegym = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const TABLE_HEAD = [
    { label: "Customer ID", icon: faUserCircle },
    { label: "Name", icon: faUserCircle },
    { label: "Mobile No", icon: faPhone },
    { label: "Date of Birth", icon: faCalendarAlt },
    { label: "Status", icon: faCheckCircle },
    { label: "Action", icon: faEdit },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://gym-backend-apis.onrender.com/admin/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTableData(response.data.users);
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
      const response = await Axios.get(`https://gym-backend-apis.onrender.com/admin/user/${customerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const newPageUrl = `/user/${customerId}`;
      window.location.href = newPageUrl;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="overflow-y-auto w-full h-screen p-4 border border-black-1000">
      <table className="text-center w-full border-collapse">
        <thead>
          <tr className="sticky top-0.1 bg-gray-50">
            {TABLE_HEAD.map(({ label, icon }) => (
              <th key={label} className="border border-black-800 p-4">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={icon} className="text-gray-500 h-4 w-4" />
                  <span className="font-normal leading-none opacity-70">{label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((rowData, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : ""} border-b border-gray-300`}>
                <td className="p-4 border-l border-r border-gray-300">{rowData.ID}</td>
                <td className="p-4 border-l border-r border-gray-300">{rowData.NAME}</td>
                <td className="p-4 border-l border-r border-gray-300">{rowData.PHONE}</td>
                <td className="p-4 border-l border-r border-gray-300">{new Date(rowData.DOB).toLocaleDateString()}</td>
                <td className="p-4 border-l border-r border-gray-300">
                  <div className="relative z-10">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={rowData.STATUS === 1 ? "Active" : "Non-Active"}
                      color={rowData.STATUS === 1 ? "green" : "blue-gray"}
                      className="text-gray-800"
                    />
                  </div>
                </td>
                <td className="p-4 border-l border-r border-gray-300">
                  <button
                    className="text-gray-800 bg-green-200 px-3 py-1 rounded-md cursor-pointer hover:bg-green-300"
                    onClick={() => handleOpenClick(rowData._id)}
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

export default Tablegym;
