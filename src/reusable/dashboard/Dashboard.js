import React from "react";
import MenuCard from "../card/MenuCard";
import {Box, Stack} from "@mui/material";

/* <Stack display='flex' flexDirection='row' justifyContent='space-around' height='100%' alignItems={'center'}> */
function Dashboard({cardsDataArray}) {


/* <Card key={index} title={title} subtitle={subtitle} description={description} onClick={()=>handleClick(url)}/> */
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
    <Stack
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        width:"70vw",
        height: "80vh",
        alignItems: "center",
      }}
    >
      {cardsDataArray.map((cardData, index) => {
        const {title, subtitle, description, url, icon} = cardData;
        return (
          <MenuCard key={index} title={title} subtitle={subtitle} description={description} url={url} icon={icon}/>
        );
      })}
    </Stack>
    </Box>
  );
}

export default Dashboard;
