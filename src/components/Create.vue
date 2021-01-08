<template>
  <div class="container">
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Title:</label>
            <input type="text" class="form-control" v-model="post.title" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Body:</label>
            <textarea class="form-control" v-model="post.body" rows="5"></textarea>
          </div>
        </div>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import router from '../router'
import axios from 'axios';

export default {
  setup() {
    const post = reactive({
      title: '',
      body: '',
    });
    const addPost = () => {
      let uri = 'http://localhost:4000/posts/add';
      axios.post(uri, post).then(() => {
        router.push({ name: 'posts' });
      });
    };
    return {
      post,
      addPost,
    };
  },
};
</script>
