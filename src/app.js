import React, {useState, useEffect} from "react";
import "regenerator-runtime"
import {Grid} from "@material-ui/core"
import Form from "./components/Form"
import List from "./components/List"
export default () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/posts", {method: "GET", headers: {
        "Accept": "application/json"
      }})
      if(data.status === 200) {
        const response = await data.json()
        setPosts(response)
      } else {
        console.log("error")
      }
    })()
  }, [])
  const addPost = async post => {
    const data = await fetch("/api/posts", {method: "POST", body: JSON.stringify(post), headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }})
    if(data.status === 201) {
      setPosts([...posts, await data.json()])
    } else {
      console.log("error")
    }
  }
  return (
    <Grid container justify="center" direction="column">
      <Form addPost={addPost}/>
      <List posts={posts}/>
    </Grid>
  )
};
