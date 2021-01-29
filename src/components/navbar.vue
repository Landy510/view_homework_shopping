<template>
    <div>
        
        <header class="navbar navbar-dark sticky-top bg-warning flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3  text-dark font-weight-bold" href="#">
            <img src=".././assets/protectionshield.svg" width="50" height="50" class="d-inline-block" alt="">
            Berserker Fitness
            </a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap border border-dark px-2">
                <a class="nav-link text-dark" href="#" @click="signOut">登出</a>
                </li>
            </ul>
        </header>
    </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
      return{

      }
  },
  methods:{
    signOut:function(){
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/login');
        }
      })
    }
  }
}
</script>
