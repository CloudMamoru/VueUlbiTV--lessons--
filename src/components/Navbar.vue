<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">CloudMamoru</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px;">О сайте</my-button>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.navbar{
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;  
}
.navbar__btns {
  margin-left: auto;
}
.logo {
  color: teal;
  font-size: 32px;
  font-family: Arial, Helvetica, sans-serif;
}

</style>