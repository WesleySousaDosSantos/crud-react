import { useEffect, useState } from "react";
import "./styles.css";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

export function OnePost() {
  const [post, setPost] = useState({});

  const {id} = useParams()
  
  useEffect(() => {
    api.get(`posts/${id}`)
    .then(response => setPost(response.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <article className="onePostContainer">
      <h2>{post.title}</h2>
      <p>
        {post.content}
      </p>
    </article>
  );
}
