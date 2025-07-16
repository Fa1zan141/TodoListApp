import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    navigate("/")
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              mb={2}
              color="primary"
            >
              Todo List Login
            </Typography>

            <Typography variant="body1" textAlign="center" mb={3}>
              Welcome back! Please log in to manage your tasks.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                type="text"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Log In
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
