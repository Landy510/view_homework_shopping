<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination" >
        
        <li class="page-item" :class="{'disabled':!author.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPagination(author.current_page-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"  v-for="page in author.total_pages" :key="page" :class="{'active':author.current_page===page}">
                <a class="page-link" href="#" @click.prevent="getPagination(page)">{{page}}</a>
            </li>
            
            <li class="page-item" :class="{'disabled':!author.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getPagination(author.current_page+1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>


<script>

  export default{
      props:{
          author:{}
      },
      data(){
          return{
              pagination:'',
              changePage:''
          }
      },
      methods:{
          getPagination(page){
              this.changePage = page; 
              this.$emit('increment',Number(this.changePage));
              
          }

      },
      created(){
          console.log('author', this.author);
      }
      
  }

</script>