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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  TablePagination,
} from "@mui/material";
import Loading from "../loading";

// Utility function to format time
const formatTime = (isoTime) => {
  if (!isoTime) return "N/A";
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Customertable = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [period, setPeriod] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const navigate = useNavigate();

  const TABLE_HEAD = [
    { field: "ID", label: "Customer ID", icon: faUserCircle },
    { field: "NAME", label: "Name", icon: faUserCircle },
    { field: "PHONE", label: "Mobile No", icon: faPhone },
    { field: "IN_TIME", label: "In Time", icon: faHourglassStart },
    { field: "OUT_TIME", label: "Out Time", icon: faHourglassEnd },
    { field: "STATUS", label: "Status", icon: faMoneyBill },
  ];

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  useEffect(() => {
    applyFilter();
  }, [tableData, filter, period]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const url =
        page === 0
          ? "https://gym-backend-apis.onrender.com/admin/attendance"
          : `https://gym-backend-apis.onrender.com/admin/attendance?page=${page}`;

      const response = await Axios.get(url, { headers });
      setTableData(response.data.customer);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const applyFilter = () => {
    let filteredResults = tableData.filter((rowData) =>
      rowData.NAME.toLowerCase().includes(filter.toLowerCase()) ||
      rowData.ID.toString().includes(filter)
    );

    if (period === "morning") {
      filteredResults = filteredResults.filter(rowData => {
        const inTime = new Date(rowData.IN_TIME).getHours();
        return inTime >= 0 && inTime < 12; // Morning session
      });
    } else if (period === "evening") {
      filteredResults = filteredResults.filter(rowData => {
        const inTime = new Date(rowData.IN_TIME).getHours();
        return inTime >= 12; // Evening session
      });
    }

    setFilteredData(filteredResults);
  };

  const handleOpenClick = async (customerId) => {
    try {
      await Axios.get(
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  return (
    <Box className="overflow-y-auto w-full h-screen p-4 mb-10 mr-5">
      <Box className="mb-4">
        
      </Box>

      <TextField
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by name or ID..."
        variant="outlined"
        className="mb-4"
        fullWidth
      />
       <Box display="flex" justifyContent="space-between" p={2}>
          <Button
            onClick={handlePreviousPage}
            disabled={page === 0}
            variant="contained"
            color="primary"
          >
            Previous
          </Button>
          <Button onClick={handleNextPage} variant="contained" color="primary">
            Next
          </Button>
        </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map(({ field, label, icon }) => (
                <TableCell key={field} align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FontAwesomeIcon icon={icon} className="mr-1" />
                    {label}
                  </Box>
                </TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={TABLE_HEAD.length + 1} align="center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={TABLE_HEAD.length + 1} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((rowData) => (
                <TableRow key={rowData.ID}>
                  {TABLE_HEAD.map(({ field }) => (
                    <TableCell key={field} align="center">
                      {field === "IN_TIME" || field === "OUT_TIME"
                        ? formatTime(rowData[field])
                        : rowData[field] || "N/A"}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#4CAF50", color: "white" }}
                      onClick={() => handleOpenClick(rowData.ID)}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
       
      </TableContainer>
    </Box>
  );
};

export default Customertable;
