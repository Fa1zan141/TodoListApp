import { Box, Button, Card, Typography } from '@mui/material'
import TodoCard from './TodoCard'
import { useEffect, useState } from 'react';

function MyTask() {

interface TaskData {
  title: string;
  description: string;
  file: string ;
  priority: string;
  status: string;
  date: string
}

const updateTaskStatus = (index: number) => {
  const updatedTasks = [...tasks];
  updatedTasks[index].status =
    updatedTasks[index].status === "Pending" ? "Completed" : "Completed";
  setTasks(updatedTasks);
  localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
};

function UpdateTaskButton({onClick}:{ onClick: () => void }) {
  return (
    <Button onClick={onClick} sx={{ backgroundColor: 'black', color: 'white' }}>
      Update Status
    </Button>
  );
}

  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("myTasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);
  return (
    <>
    <Typography variant='h5' fontWeight={700} sx={{color:"black", marginBottom:"20px"}}>My Task</Typography>
    <Box>
        <Card sx={{backgroundColor:'white', color:'black', padding:"20px"}}>
          <Card sx={{ backgroundColor: 'white', color: 'black', padding: "20px" }}>
          {tasks.length === 0 ? (
            <Typography>No tasks found.</Typography>
          ) : (
            tasks.map((task, index) => (
              <Box sx={{marginBottom:'20px'}}>
              <TodoCard
                key={index}
                Title={task.title}
                Description={task.description}
                Prority={task.priority}
                Status={task.status}
                selectedFile={task.file}
                date={task.date}
                updateButton={<UpdateTaskButton onClick={() => updateTaskStatus(index)} />}
              />
              </Box>
            ))
          )}
        </Card>
        </Card>
    </Box>
    </>
  )
}

export default MyTask
