<template>
  <div class="admin-wrapper">
    <div class="admin-header">
      <h2 class="header-title" style="margin-right: auto" @click="goToHome">
        Sort<span>Mate</span> Admin
      </h2>
      <v-btn color="primary" @click="isNewProductVisible = true"
        >Add product</v-btn
      >
      <v-btn color="accent" @click="isNewUserVisible = true">Add user</v-btn>
      <v-btn class="red darken-1" @click="logoutUser">Logout</v-btn>
    </div>
    <div class="admin-tabs-header">
      <v-tabs>
        <v-tab to="/admin/requests">Requests</v-tab>
        <v-tab to="/admin/items">Items</v-tab>
      </v-tabs>
    </div>
    <div class="admin-main">
      <router-view></router-view>
    </div>
    <AddUser
      :isVisible="isNewUserVisible"
      @closeModal="isNewUserVisible = false"
    />
    <AddProduct
      :isVisible="isNewProductVisible"
      @closeModal="isNewProductVisible = false"
    />
  </div>
</template>

<script>
import AddUser from "../components/Admin/AddUser.vue";
import AddProduct from "../components/Admin/AddProduct.vue";

export default {
  name: "Admin",
  components: { AddUser, AddProduct },
  data() {
    return {
      isNewUserVisible: false,
      isNewProductVisible: false
    };
  },
  methods: {
    logoutUser() {
      localStorage.clear("token");
      this.$router.push("/login");
    },

    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.admin-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.admin-header {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  padding: 1rem 2rem;
  gap: 0.5rem 1rem;
  background-color: white;
}

.admin-tabs-header {
  display: flex;
  width: 100%;
}

.admin-main {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
}

.header-title {
  margin: 0;
}

.header-title {
  cursor: pointer;
}

.header-title span {
  color: purple;
}
</style>
