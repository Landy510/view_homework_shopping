<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination" >
            <li class="page-item" :class="{'disabled':!has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPagination(current_page-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"  v-for="page in total_page" :key="page" :class="{'active':current_page===page}">
                <a class="page-link" href="#" @click.prevent="getPagination(page)">{{page}}</a>
            </li>
            
            <li class="page-item" :class="{'disabled':!has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getPagination(current_page+1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>


<script>

  export default{
      props:['total_page', 'current_page','has_next', 'has_pre'],
      data(){
          return{
              pagination:'',
              changePage:''
          }
      },
      methods:{
          getPagination(page){
              this.changePage = page; 
              this.$emit('increment',Number(this.changePage))
          }

      }
      
  }

</script>