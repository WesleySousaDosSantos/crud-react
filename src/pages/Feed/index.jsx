import { useEffect, useState } from 'react';
import { Card } from '../../components/Card'
import './styles.css'
import { api } from '../../lib/axios';

export function Feed() {

  const [posts, setPost] = useState([])

  useEffect(() => {
    api.get('/posts')
      .then((response) => {
        setPost(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  function handleDeletePost(id) {
      setPost(posts.filter(posts => posts.id !== id))
      api.delete(`/posts/${id}`)
  }

  return (
    <div className="feedContainer">
      {posts.map((post) => (
         <Card key={post.id} post={post} onDeletePost={handleDeletePost}/>
      ))}
    </div>
  );
}
