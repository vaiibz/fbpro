import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Modal from '@mui/material/Modal';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import axios from 'axios'


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const email = localStorage.getItem('email');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    setIsLoggedIn(email && storedIsLoggedIn === 'true');
  }, []);

  const handleLogout = () => {
    // Clear the email and isLoggedIn from localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload();
  };


  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);


  // register 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);


  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8080/api/register', formData);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  // LogIn 
  const [loginFormData, setLoginFormData] = useState({
    LogInemail: '',
    LogInpassword: ''
  });

  const handleChange2 = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      console.log(loginFormData);
      const response = await axios.post('http://localhost:8080/api/login', loginFormData);
      alert(response.data.message);

      // If login is successful, save the email in localStorage
      if (response.status === 200) {
        localStorage.setItem('email', loginFormData.LogInemail);
        localStorage.setItem('isLoggedIn', true);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error response
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#36416A",
          width: "100%",
          height: "60px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: "1.2rem", md: "3rem" },
        }}
      >
        <Typography
          variant="body1"
          color="#fff"
          sx={{ fontWeight: "600", fontSize: "1.5rem" }}
        >
          FeedBack
        </Typography>
        <Box
          sx={{
            gap: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {isLoggedIn ? (
            <Button sx={{ color: '#fff', fontSize: '1rem' }} onClick={handleLogout}> Logout </Button>
          ) : (
            <>
              <Button sx={{ color: '#fff', fontSize: '1rem' }} onClick={handleOpen}> Log in </Button>
              <Button sx={{ color: '#fff', border: "1.2px solid white", fontSize: '1rem' }} onClick={handleOpen2}>Sign Up </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Login Model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            height: '70vh',
            width: {
              xs: '300px',
              md: '600px'
            }
          }}
        >
          <Grid container spacing={0}>
            {/* Left */}
            <Grid item xs={12} md={6}
              sx={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                flexDirection: 'column'
              }}
            >
              <Box>
                <Typography variant="h5" color="initial" fontWeight={600} mb={3}>
                  Log in to continue
                </Typography>
                <Box display="flex" alignItems="center">
                  <MailOutlineIcon sx={{ mr: 1, width: '1rem' }} />
                  <input type="email" className="Login_Input" name="LogInemail" placeholder="Email" value={loginFormData.LogInemail} onChange={handleChange2}
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <LockIcon sx={{ mr: 1, width: '1rem' }} />
                  <input type="password" className="Login_Input" name="LogInpassword" placeholder="Password" value={loginFormData.LogInpassword} onChange={handleChange2}
                  />
                </Box>
                <Button
                  sx={{
                    fontSize: '0.8rem', mt: 1.2, py: 2, px: 4,
                    backgroundColor: '#36416A',
                    borderRadius: '30px',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#36416A'
                    }
                  }}
                  onClick={handleLogin}
                >
                  Log in
                </Button>
              </Box>
            </Grid>
            {/* Right */}
            <Grid
              item
              xs={0}
              md={6}
              sx={{ backgroundColor: '#36416A', color: '#fff', p: 2, height: '70vh' }}
            >
              <Typography variant="h4" mt={6} fontWeight={600}>
                Feedback
              </Typography>
              <Typography variant="h6" mt={3} width="150px">
                Add your product and rate other items.........
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Register Model */}

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          height: "70vh",
          width: {
            xs: '300px', md: '600px'
          }
        }}>
          <Grid container spacing={0}>
            {/* Left */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography variant="h5" color="initial" fontWeight={600} mb={3}>
                  Signup to continue
                </Typography>
                <Box display="flex" alignItems="center">
                  <PersonIcon sx={{ mr: 1, width: '1rem' }} />
                  <input type="text" className="Login_Input" name="username" placeholder="Name" value={formData.username} onChange={handleChange}
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <MailOutlineIcon sx={{ mr: 1, width: '1rem' }} />
                  <input type="email" className="Login_Input" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <MobileScreenShareIcon sx={{ mr: 1, width: '1rem' }} />
                  <input
                    type="number" className="Login_Input" name="number" placeholder="+9183023923"
                    style={{
                      '-moz-appearance': 'textfield',
                      '-webkit-appearance': 'textfield',
                      appearance: 'textfield',
                    }}
                    value={formData.number}
                    onChange={handleChange}
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <LockIcon sx={{ mr: 1, width: '1rem' }} />
                  <input type="password" className="Login_Input" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                  />
                </Box>
                <Button
                  sx={{
                    fontSize: '0.8rem', mt: 1.2, py: 2, px: 4,
                    backgroundColor: '#36416A',
                    borderRadius: '30px',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#36416A',
                    },
                  }}
                  onClick={handleSubmit}
                >
                  SignUp
                </Button>
              </Box>
            </Grid>
            {/* Right */}
            <Grid item xs={0} md={6}
              sx={{ backgroundColor: '#36416A', color: '#fff', p: 2, height: '70vh' }}>
              <Typography variant="h4" mt={6} fontWeight={600}>
                Feedback
              </Typography>
              <Typography variant="h6" mt={3} width="150px">
                Add your product and rate other items.......
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Header;








