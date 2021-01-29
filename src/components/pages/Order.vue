<template>
    <div>
        
        <table class="table mt-4">
            <thead>
                <th width="120">購買名稱</th>
                <th width="120">Email</th>
                <th width="120">購買款項</th>
                <th width="100">應付金額</th>
                <th width="80">是否付款</th>
            </thead>
            <tbody>
                <tr v-for="(item, key) in product" :key="key">
                    <td>{{item.create_at}}</td>
                    <td>{{item.user.eamil}}</td>
                    <td>{{item.products}}</td>
                    
                    <td class="text-right">
                        {{item.total | currency}}
                    </td>
                    <td>
                        <span v-if="item.is_paid" class="text-success">已付款</span>
                        <span v-else>未付款</span>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        <pagination :has_pre="pagination.has_pre" :has_next="pagination.has_next" :total_page="pagination.total_pages" :current_page="pagination.current_page" v-on:increment="getList"></pagination>
    </div>
</template>


<script>
    import $ from 'jquery';
    import pagination from './pagination';

    export default{
        data(){
            return{
                product:[],
                pagination:{},
                isLoading:false,
            }
        },
        components:{
            pagination
        },
        methods:{
            getList(page = 1){
                console.log('page',page);
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
                this.$http.get(api).then((response) => {
                    if(response.data.success){
                        vm.product = response.data.orders;
                        vm.pagination = response.data.pagination;
                    }
                })
                
            }
        },
        created(){
            this.getList();   
        },
    }
    
</script>