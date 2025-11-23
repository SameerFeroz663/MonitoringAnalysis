import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#008F4C' },
    success: { main: '#008F4C' },
  },
});

export default function AssessmentForm() {
  const [formData, setFormData] = useState({
    district: "",
    monthName: "",
    reportDate: "",
    data: {
      age_06_to_23_months: {
        male: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
        female: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
      },
      age_24_to_59_months: {
        male: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
        female: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
      },
    },
  });

  // Handle simple text inputs (district, monthName, etc.)
  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle nested gender inputs
  const handleNestedChange = (ageGroup, gender, field, value) => {
    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [ageGroup]: {
          ...prev.data[ageGroup],
          [gender]: {
            ...prev.data[ageGroup][gender],
            [field]: Number(value),
          },
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/api/assessment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (response.ok) {
      alert("Assessment saved successfully!");
      setFormData({
    district: "",
    monthName: "",
    reportDate: "",
    data: {
      age_06_to_23_months: {
        male: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
        female: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
      },
      age_24_to_59_months: {
        male: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
        female: {
          oedema: 0,
          samWithComplication: 0,
          samWithoutComplication: 0,
          mam: 0,
          normal: 0,
          totalChildrenAssessed: 0,
        },
      },
    },
      });

    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error("Request failed:", err);
    alert("Failed to connect to server");
  }
};


  const numberFields = [
    "oedema",
    "samWithComplication",
    "samWithoutComplication",
    "mam",
    "normal",
    "totalChildrenAssessed",
  ];

  const renderGenderFields = (ageGroup, gender) => (
    <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: 1, mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {gender.toUpperCase()}
      </Typography>

      <Stack spacing={2}>
        {numberFields.map((field) => (
          <TextField
            key={field}
            label={field}
            type="number"
              size="small"

            value={formData.data[ageGroup][gender][field]}
            onChange={(e) =>
              handleNestedChange(ageGroup, gender, field, e.target.value)
            }
            fullWidth
            
            color="primary"
            required
          />
        ))}
      </Stack>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: "#fff",
          boxShadow: "0px 0px 3px 0px #9e9e9e9b",
          maxWidth: "100%",
          mx: "auto",
          mb: 3,
        }}
      >
        <Stack sx={{ p: 3 }}>
          <Typography variant="h6">Nutrition Assessment Form</Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mt: 2 }}>

              <TextField
                label="District"
                name="district"
                value={formData.district}
                onChange={handleSimpleChange}
                fullWidth
                  size="small"
                required
              />

              <TextField
                label="Month Name"
                name="monthName"
                value={formData.monthName}
                onChange={handleSimpleChange}
                fullWidth
                  size="small"

                required
              />

              <TextField
                label="Report Date"
                name="reportDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.reportDate}
                onChange={handleSimpleChange}
                fullWidth
                  size="small"

                required
              />

              {/* AGE GROUP 6-23 MONTHS */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Age 06 – 23 Months
              </Typography>

              {renderGenderFields("age_06_to_23_months", "male")}
              {renderGenderFields("age_06_to_23_months", "female")}

              {/* AGE GROUP 24-59 MONTHS */}
              <Typography variant="h6"  sx={{ mt: 2 }}>
                Age 24 – 59 Months
              </Typography>

              {renderGenderFields("age_24_to_59_months", "male")}
              {renderGenderFields("age_24_to_59_months", "female")}

              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ color: "white", mt: 2 }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
