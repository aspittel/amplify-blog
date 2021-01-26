import { useEffect, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore'
import { Post } from './models'

import { withAuthenticator } from '@aws-amplify/ui-react'

import './App.css'

function App () {
  const [posts, setPosts] = useState('')
  useEffect(() => {
    const callApi = async () => {
      const posts = await DataStore.query(Post)
      setPosts(posts)
      console.log(posts)
    }

    callApi()
  }, [])

  const createPost = async () => {
    const newPost = await DataStore.save(
      new Post({
        title: window.prompt('post title'),
        text: window.prompt('post text')
      })
    )
    console.log(newPost)
  }
  return (
    <div className='App'>
      <button onClick={createPost}>create new post</button>
    </div>
  )
}

export default withAuthenticator(App)
