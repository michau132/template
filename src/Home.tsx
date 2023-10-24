import React from "react";
import "./Home.css";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
} from "@mui/material";

/*
use redux to make
 */

const baseURL = "https://api.spacexdata.com/v3/capsules";

export const Home = () => {
  const [post, setPost] = React.useState<Array<any> | null>(null);
  const [error, setError] = React.useState(null);
  const [capsules, setCapsules] = React.useState<Array<any>>([]);
  const [checked, setChecked] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [baseURL]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (error) return `Ups, something went wrong`;
  if (!post) {
    setPost([]);
    return "Fetching data!";
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <List>
          {post.map((capsule) => {
            const labelId = `checkbox-list-secondary-label-${capsule.capsule_serial}`;
            return (
              <ListItem
                key={capsule.capsule_id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(post?.indexOf(capsule))}
                    checked={checked.indexOf(post?.indexOf(capsule)) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton onClick={}>
                  <ListItemText
                    id={labelId}
                    primary={
                      " capsule: " +
                      capsule.capsule_id +
                      " status: " +
                      capsule.status +
                      " desc: " +
                      capsule.details
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </header>
    </div>
  );
};
/*
            <li key={capsule.capsule_serial}>
              {capsule.capsule_serial +
                " " +
                capsule.status +
                " " +
                capsule.details}
            </li>
*/
