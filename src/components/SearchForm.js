import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCircle,
  faPhone,
  faHourglassStart,
  faHourglassEnd,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@material-tailwind/react";
import Axios from "axios";
// import "../../styles/sty.css";

const Attendance = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const TABLE_HEAD = [
    { label: "SI.no", icon: faUser },
    { label: "Customer ID", icon: faUserCircle },
    { label: "Name", icon: faUserCircle },
    { label: "Mobile No", icon: faPhone },
    { label: "In Time", icon: faHourglassStart },
    { label: "Out Time", icon: faHourglassEnd },
    { label: "Duration", icon: faTimeline },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://gym-backend-apis.onrender.com/admin/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const users = response.data.users;
        const enrichedUsers = await Promise.all(
          users.map(async (user) => {
            const punchInResponse = await Axios.get(`https://gym-backend-apis.onrender.com/admin/punch/in?userId=${user._id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            const punchOutResponse = await Axios.get(`https://gym-backend-apis.onrender.com/admin/punch/out?userId=${user._id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            const inTime = punchInResponse.data.inTime ? new Date(punchInResponse.data.inTime) : null;
            const outTime = punchOutResponse.data.outTime ? new Date(punchOutResponse.data.outTime) : null;

            let duration = null;
            if (inTime && outTime) {
              const durationMs = outTime - inTime;
              const durationHours = (durationMs / (1000 * 60 * 60)).toFixed(2);
              duration = `${durationHours} hrs`;
            }

            return { ...user, inTime, outTime, duration };
          })
        );

        setTableData(enrichedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      navigate(newPageUrl); // Use navigate to redirect to the new page
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="overflow-y-auto px-15 border border-black-1000 h-96">
      <table className="text-center w-full border-collapse">
        <thead>
          <tr className="sticky top-0">
            {TABLE_HEAD.map(({ label, icon }) => (
              <th key={label} className="rounded-lg border border-black-800 bg-gray-50 p-4">
                <div className="flex items-center justify-center gap-1">
                  <FontAwesomeIcon icon={icon} className="text-green-gray-500 h-3 w-3" />
                  <span className="font-normal leading-none opacity-70">{label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((rowData, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : ""} border-b border-blue-gray-800`}>
                <td className="p-4 border-l border-r border-blue-gray-800">{index + 1}</td>
                <td className="p-4 border-l border-r border-blue-gray-800">{rowData._id}</td>
                <td className="p-4 border-l border-r border-blue-gray-800">{rowData.NAME}</td>
                <td className="p-4 border-l border-r border-blue-gray-800">{rowData.PHONE}</td>
                <td className="p-4 border-l border-r border-blue-gray-800">{rowData.inTime ? rowData.inTime.toLocaleTimeString() : "N/A"}</td>
                <td className="p-4 border-l border-r border-blue-gray-800">{rowData.outTime ? rowData.outTime.toLocaleTimeString() : "N/A"}</td>
                <td className="p-4 border-l border-r border-blue-gray-800">{rowData.duration ? rowData.duration : "N/A"}</td>
                <td className="p-4 border-l border-r border-blue-gray-800 w-20">
                  <Chip
                    variant="ghost"
                    size="sm"
                    value={rowData.STATUS === 1 ? "Active" : "Non-Active"}
                    color={rowData.STATUS === 1 ? "green" : "blue-gray"}
                    className="text-gray-800"
                  />
                </td>
                <td className="p-4 border-l border-r border-blue-gray-800 w-20">
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
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
