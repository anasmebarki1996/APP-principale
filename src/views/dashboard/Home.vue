<template>
  <div class="home">
    <div id="searchbar">
      <form action="">
        <input class="champ" type="text" placeholder="Search...)" />
        <input class="bouton" type="button" value=" " />
      </form>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
#searchbar {
  position: relative;
  width: 1040px;
  height: auto;
  display: inline-block;
}
#searchbar .text {
  width: 300px;
  float: left;
}
#searchbar .champ {
  width: 600px;
  height: 35px;
  float: left;
}
#searchbar .bouton {
  /* background-image: url(images/searchbar_button.png); */
  width: 35px;
  height: 35px;
  padding: 0;
  border: none;
  float: left;
}
</style>
