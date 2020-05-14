<template>
  <div class="app">
    <h1 key="a">
      <vue-typer key="l" text="Quvia Essay - Admin" :repeat="0"></vue-typer>
      <br />
    </h1>
    <br />
    <b-input class="loginInput" v-model="username" placeholder="Uživatelské jméno" />
    <br />
    <b-input
      class="loginInput"
      v-model="pass"
      placeholder="Heslo "
      description="Vaše heslo si nemůžeme zobrazit, je šifrované a v bezpečí."
    />
    <br />
    <b-button @click="login">Přihlásit se</b-button>
  </div>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      pass: ""
    };
  },
  components: {},
  methods: {
    login() {
      this.$alert.fire({
        title: "Super!",
        html: "Ověřili jsme Vás - pusťte se do toho.",
        icon: "success",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "bottom-end"
      });
      let userCreds = {
        username: this.username,
        password: this.pass
      };
      localStorage.setItem("userCreds", JSON.stringify(userCreds));
      this.$router.push("main");
    }
  }
};
</script>


<style lang="scss" src="../App.scss">