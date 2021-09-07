
<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("SET_TOKEN", token);
      this.$store
        .dispatch("getUserInfos")
        .then(() => {
          this.$router.push("/forum");
        })
        .catch(() => {
          localStorage.removeItem("token");
          this.$store.commit("SET_TOKEN", null);
          this.$router.push("/login");
        });
    } else {
      this.$router.push("/login");
    }
  },
};
</script>


<style>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
.one-post {
  margin-bottom: 20px;
}
h2,
h1 {
  margin-bottom: 10px;
  color: #000000;
  font-size: 1.5em;
}
body {
  background-image: linear-gradient(to bottom, #77b5fe, #b0f2b6);
  display: flex;
  justify-content: center;
  padding: 0% 5%;
  min-height: 100vh;
}
.login {
  width: 500px;
  margin-top: 3rem;
  margin-bottom: 2rem;
  border-radius: 50px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: #2196f3;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>