import React from "react";
import "./Capsule.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { List, ListItemText, Button } from "@mui/material";

const baseURL = "https://api.spacexdata.com/v3/capsules";

export const Capsule = () => {
  const [post, setPost] = React.useState<any | null>(null);
  const [error, setError] = React.useState(null);
  const { capsule } = useParams<{ capsule: string }>();

  React.useEffect(() => {
    axios
      .get(`${baseURL}/${capsule}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  });

  if (error) return `Ups, something went wrong`;
  if (!post) {
    return "Fetching data!";
  }

  const missions = post.missions;

  return (
    <div className="Home">
      <header className="Home-header">
        <List>
          <ListItemText>{post.capsule_id}</ListItemText>
          <ListItemText>{post.status}</ListItemText>
          <ListItemText>{post.details}</ListItemText>
          <List>
            <>
              Missions:
              {missions.map((mission: any) => {
                return mission.name + " ";
              })}
            </>
          </List>
          <Link to={"../"}>
            <Button>Home</Button>
          </Link>
        </List>
      </header>
    </div>
  );
};
