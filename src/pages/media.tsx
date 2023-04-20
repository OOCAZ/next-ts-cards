import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface JSONData {
  name: string;
  description: string;
  image: string;
  key: string;
}

const Home = () => {
  const [toggle, setToggle] = React.useState(true);
  const [arrayData, setArrayData] = React.useState<JSONData[]>([]);

  useEffect(() => {
    setToggle(false);
    async function getData() {
      if (toggle) {
        await axios
          .get("http://localhost:3000/api/example")
          .then((response) => {
            for (let int in response.data) {
              setArrayData((arrayData) => [...arrayData, response.data[int]]);
            }

            console.log(arrayData);
          })
          .catch((e) => console.error(e));
      }
    }
    getData();
  }, []);

  return (
    <main>
      <div className="main-contianer" style={{ paddingTop: "5vh" }}>
        <Card sx={{ ml: "15vw", mr: "15vw" }}>
          <CardContent>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Template
            </Typography>
          </CardContent>
        </Card>

        {arrayData.map((element) => (
          <Card variant="outlined" sx={{ m: "5vw" }} key={element.key}>
            <CardMedia
              component="img"
              height="194"
              image={element.image}
              alt={element.description}
            />
            <CardContent>
              <Typography sx={{ ml: "10vw" }}>{element.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home;
