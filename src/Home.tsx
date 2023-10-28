import React from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { change_x, selectCount } from "./features/favourites";

const baseURL = "https://api.spacexdata.com/v3/capsules";

export const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const [post, setPost] = React.useState<Array<any> | null>(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${baseURL}`)
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

  return (
    <div className="Home">
      <header className="Home-header">
        <List>
          {post.map((capsule) => {
            return (
              <ListItem
                key={capsule.capsule_id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={() => dispatch(change_x(post?.indexOf(capsule)))}
                    checked={count.indexOf(post?.indexOf(capsule)) !== -1}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText
                    id={capsule.capsule_serial}
                    primary={
                      " capsule: " +
                      capsule.capsule_id +
                      " status: " +
                      capsule.status +
                      " details: " +
                      capsule.details
                    }
                  />
                  <Link to={capsule.capsule_serial}>
                    <Button>Show more</Button>
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </header>
    </div>
  );
};
