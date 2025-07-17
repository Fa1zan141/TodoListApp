import { Box, Button, Card, CircularProgress, Grid, Modal, Typography } from "@mui/material";
import TodoCard from "./TodoCard";
import {useEffect, useState } from "react";

function Dashboard() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 500, md: 600 },
    bgcolor: "white",
    boxShadow: 14,
    color: "black",
    p: "20px",
    borderRadius: "10px",
  };

  interface TaskData {
    title: string;
    description: string;
    file: string ;
    priority: string;
    status: string;
    date: string
  }

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Pending");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let fileData: string  = "";
    if (selectedFile) {
      fileData = await toBase64(selectedFile);
    }
    const newTask: TaskData = {
      title,
      description,
      file: fileData,
      priority,
      status,
      date
    };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setTitle("");
    setDescription("");
    setDate("");
    setSelectedFile(null);
    setPriority("High");
    setStatus("Pending");
    handleClose();
  };

  useEffect(() => {
    const data = localStorage.getItem("myTasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };

  const updateTaskStatus = (index: number) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index].status === "Pending") {
      updatedTasks[index].status = "Completed";
    }
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const completedPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const pendingPercent = totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0;



  return (
    <>
      <Typography sx={{ fontSize:'20px', fontWeight: 700, mb: 2, color:"black", marginTop:"1px" }}>
        Welcome back, Faizan 
      </Typography>
      <Box sx={{ border: "1px solid #565656", p: 2, borderRadius: "5px" }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Card sx={{ p: 2, backgroundColor: "white", color: "black" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Todo</Typography>
                <Button onClick={handleOpen} variant="outlined" sx={{ color: "black" }}>
                  + Add Task
                </Button>
              </Box>

              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Add Task
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <label>Title</label>
                      <input
                        style={{ height: "30px" }}
                        type="text"
                        placeholder="Enter Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <label>Description</label>
                      <input
                        style={{ height: "30px" }}
                        type="text"
                        placeholder="Enter Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                      <label>Upload Image</label>
                      <input style={{ height: "30px" }} type="file" onChange={handleFileChange} />
                      {selectedFile && <Typography>Selected: {selectedFile.name}</Typography>}
                      <label>Priority</label>
                      <select
                        style={{ height: "30px" }}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="High">High</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Low">Low</option>
                      </select>
                      <label>Date</label>
                      <input style={{ height: "30px" }} type="date" value={date} onChange={(e)=> setDate(e.target.value)} />
                      <Button sx={{ backgroundColor: "black", color: "white" }} type="submit">
                        Submit
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Modal>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {tasks.length === 0 ? (
                  <Typography>No tasks found.</Typography>
                ) : (
                  tasks.map((task, index) => (
                    <TodoCard
                      key={index}
                      Title={task.title}
                      Description={task.description}
                      Prority={task.priority}
                      Status={task.status}
                      selectedFile={task.file}
                      date={task.date}
                      deleteButton={
                        <Button
                          onClick={() => deleteTask(index)}
                          sx={{ backgroundColor: "black", color: "white", mt: 1 }}
                        >
                          Delete Task
                        </Button>
                      }
                      updateButton={
                        <Button
                          onClick={() => updateTaskStatus(index)}
                          sx={{ backgroundColor: "black", color: "white", mt: 1 }}
                        >
                          Update Status
                        </Button>
                      }
                    />
                  ))
                )}
              </Box>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card sx={{ p: 2, backgroundColor: "white", color: "black" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Task Status
              </Typography>
              <Box sx={{display:'flex', gap:"20px", justifyContent:"center", alignItems:"center"}}>
                <Box sx={{display:'flex', gap:"10px"}}><Box sx={{backgroundColor:"orange", width:"20px", height:"20px", borderRadius:'100PX' }}></Box>Pending</Box>
                 <Box sx={{display:'flex', gap:"10px"}}><Box sx={{backgroundColor:"green", width:"20px", height:"20px", borderRadius:'100PX' }}></Box>Completed</Box>
              </Box>
              <Card sx={{ backgroundColor:"white", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}>
              <CircularProgressWithLabel value={completedPercent} color="green" />
              <CircularProgressWithLabel value={pendingPercent} color="orange" />
              </Card>

              <Typography variant="h5" fontWeight={700} sx={{ mt: 3, mb: 2 }}>Completed Tasks</Typography>
              {tasks.filter((task) => task.status === "Completed").length > 0 ? (
                tasks
                  .filter((task) => task.status === "Completed")
                  .map((task, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <TodoCard
                        Title={task.title}
                        Description={task.description}
                        Prority={task.priority}
                        Status={task.status}
                        selectedFile={task.file}
                        date={task.date}
                      />
                    </Box>
                  ))
              ) : (
                <Typography>No Completed Task Yet</Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;

const CircularProgressWithLabel = ({ value, color }: { value: number; color: string }) => {
  return (
    <Box>
    <Box position="relative" display="inline-flex" margin={2}>
      <CircularProgress
        variant="determinate"
        value={value}
        thickness={5}
        size={100}
        sx={{
          color: color,
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="black" fontSize="20px">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
    </Box>
  );
};
