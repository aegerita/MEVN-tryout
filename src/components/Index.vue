<template>
  <div>
    <h1>Posts</h1>
    <div class="row">
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Post</router-link>
      </div>
    </div>
    <br />

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post._id">
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>
            <router-link :to="{ name: 'edit', params: { id: post._id } }" class="btn btn-primary">Edit</router-link>
          </td>
          <td><button class="btn btn-danger" @click.prevent="deletePost(post._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const posts = ref([]);
    let url = 'http://localhost:4000/posts';
    axios.get(url).then(response => {
      console.log('got it');
      posts.value = response.data;
    });

    const deletePost = id => {
      let uri = `http://localhost:4000/posts/delete/${id}`;
      axios.delete(uri).then(response => {
        console.log(response);
        posts.value.splice(posts.value.indexOf(id), 1);
      });
    };

    return { posts, deletePost };
  },
};
</script>
