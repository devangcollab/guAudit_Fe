// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Chip,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { getUserByLocationId } from "../../Apis/user";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const UserMultipleSelection = ({
//   selectedLocation,
//   onChange,
//   alreadyAssignedUserIds = [],
// }) => {
//   const theme = useTheme();

//   const [selectedUsersByLocation, setSelectedUsersByLocation] = useState({}); // { locationId: userObject }
//   const [currentUsers, setCurrentUsers] = useState([]); // users for current location

//   // Fetch users for selected location
//   useEffect(() => {
//     const callApi = async () => {
//       try {
//         const res = await getUserByLocationId(selectedLocation?.value);
//         setCurrentUsers(res.data?.data || []);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     if (selectedLocation?.value) {
//       callApi();
//     }
//   }, [selectedLocation]);

//   const selectedUser =
//     selectedUsersByLocation[selectedLocation?.value]?._id || "";

//   const handleChange = (event) => {
//     const userId = event.target.value;
//     const selectedUserObj = currentUsers.find((u) => u._id === userId);

//     if (!selectedUserObj || !selectedLocation?.value) return;

//     setSelectedUsersByLocation((prev) => {
//       const updated = {
//         ...prev,
//         [selectedLocation.value]: selectedUserObj,
//       };
//       onChange?.(Object.values(updated).map((u) => u._id));
//       return updated;
//     });
//   };

//   return (
//     <Box>
//       {/* Chips for all selected users */}
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//         {Object.values(selectedUsersByLocation).map((user) => (
//           <Chip
//             key={user._id}
//             label={`${user.name} - ${user.locId?.locName}`}
//           />
//         ))}
//       </Box>

//       {/* Select dropdown (1 user per location) */}
//       <FormControl fullWidth size="small">
//         <InputLabel id="user-select-label">Select Users</InputLabel>
//         <Select
//           labelId="user-select-label"
//           id="user-select"
//           value={selectedUser}
//           onChange={handleChange}
//           input={<OutlinedInput label="Select Users" />}
//           MenuProps={MenuProps}
//         >
//           {currentUsers.map((user) => (
//             <MenuItem
//               key={user._id}
//               value={user._id}
//               // disabled={alreadyAssignedUserIds
//               //   .map((item) =>
//               //     typeof item === "string" ? item : item.user?.toString()
//               //   )
//               //   .includes(user._id?.toString())}
//             >
//               {user.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default UserMultipleSelection;


import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { getUserByLocationId } from "../../Apis/user";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserMultipleSelection = ({
  selectedLocation,
  onChange,
  value = [], // selected user IDs
  alreadyAssignedUserIds = [],
}) => {
  const theme = useTheme();

  const [selectedUsersByLocation, setSelectedUsersByLocation] = useState({});
  const [currentUsers, setCurrentUsers] = useState([]);

  // Fetch users when location changes
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getUserByLocationId(selectedLocation?.value);
        setCurrentUsers(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (selectedLocation?.value) {
      callApi();
    }
  }, [selectedLocation]);

  // Sync with parent `value`
  useEffect(() => {
    const newMap = {};
    value.forEach((userId) => {
      const foundUser = currentUsers.find((u) => u._id === userId);
      if (foundUser && selectedLocation?.value) {
        newMap[selectedLocation.value] = foundUser;
      }
    });
    setSelectedUsersByLocation(newMap);
  }, [value, currentUsers, selectedLocation]);

  const selectedUserId =
    selectedUsersByLocation[selectedLocation?.value]?._id || "";

  const handleChange = (event) => {
    const userId = event.target.value;
    const selectedUserObj = currentUsers.find((u) => u._id === userId);

    if (!selectedUserObj || !selectedLocation?.value) return;

    setSelectedUsersByLocation((prev) => {
      const updated = {
        ...prev,
        [selectedLocation.value]: selectedUserObj,
      };
      onChange?.(Object.values(updated).map((u) => u._id));
      return updated;
    });
  };

  return (
    <Box>
      {/* Selected User Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {Object.values(selectedUsersByLocation).map((user) => (
          <Chip
            key={user._id}
            label={`${user.name} - ${user.locId?.locName}`}
          />
        ))}
      </Box>

      {/* User Selection Dropdown */}
      <FormControl fullWidth size="small">
        <InputLabel id="user-select-label">Select Users</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUserId}
          onChange={handleChange}
          input={<OutlinedInput label="Select Users" />}
          MenuProps={MenuProps}
        >
          {currentUsers.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserMultipleSelection;
