<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input 
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions" 
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Идет загрузка...</div>
    <div class="page__wrapper">
      <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        class="page"
        :class="{
          'current-page': this.page === pageNumber
        }"
        @click="changePage(pageNumber)"
      >{{ pageNumber }}</div>
    </div>
  </div>
</template>
  
<script>
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import axios from 'axios';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' }
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.posts = response.data;
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) ;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    }
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    page() {
      this.fetchPosts();
    }
  },
  computed: {
    selectedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.selectedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery))
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>
