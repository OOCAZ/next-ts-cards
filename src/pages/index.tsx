import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
            for (var int in response.data) {
              arrayData.push(response.data[int]);
            }

            console.log(arrayData);
          });
        return;
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
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Image
                  src={element.image}
                  alt={element.description}
                  width="100"
                  height="100"
                />
                <Typography sx={{ ml: "10vw" }}>{element.name}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home;
