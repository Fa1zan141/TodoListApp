import { Box, Card, Typography } from '@mui/material'

interface data {
  Title: string;
  Description: string;
  Prority: string;
  Status: string;
  selectedFile: string;
  date: string;
  deleteButton?: React.ReactNode;
  updateButton?: React.ReactNode;
}

function TodoCard({ Title, Description, Prority, Status, selectedFile, deleteButton, updateButton, date }: data) {
  return (
    <>
      <Card sx={{ backgroundColor: 'white', py: '10px', px: "20px", color: 'black', border: '1px solid #565656', outline: "none", borderRadius: "15px" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 5, width:"100%" }}>
          <Box sx={{ flex: 1, width:{xs:'100%', md:"80%"} }}>
            <Typography variant='h6' fontWeight={600}>{Title}</Typography>
            <Typography>{Description}</Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Typography fontWeight={600}>Priority: {Prority}</Typography>
              <Typography fontWeight={600}>Status: {Status}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {deleteButton}
              {updateButton}
            </Box>
          </Box>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            width:"20%"
          }}>
            <img src={selectedFile} alt="Image" width={"100px"} height={"100px"} draggable={false} />
            <Typography>{date}</Typography>
          </Box>
        </Box> 
      </Card>
    </>
  )
}

export default TodoCard
