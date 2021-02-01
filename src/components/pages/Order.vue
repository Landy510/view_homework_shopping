<template>
    <div>
        <div class="vld-parent">
            <loading :active.sync="isLoading"></loading>
        </div>
        <table class="table mt-4">
            <thead>
                <th width="120">購買時間</th>
                <th width="120">Email</th>
                <th width="120">購買款項</th>
                <th width="50">應付金額</th>
                <th width="80">是否付款</th>
            </thead>
            <tbody>
                <tr v-for="(item, key) in product" :key="key">
                    <td>{{getLocalTime(item.create_at)}}</td>
                    <td>{{item.user.email}}</td>
                    <td>
                        <span v-for="(obj,index) in item.products">{{obj.product.title}}, </span>
                    </td>
                    
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
        <pagination :author="pagination" v-on:increment="getList"></pagination>
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
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    
                    if(response.data.success){
                        vm.product = response.data.orders;
                        vm.pagination = response.data.pagination;
                        console.log('response',vm.product);
                    }
                    vm.isLoading = false;
                })
                
            },
            getLocalTime(nS) {  
                return new Date(parseInt(nS) * 1000).toLocaleDateString().replace(/:\d{1,2}$/,' ');  
            }
        },
        created(){
            this.getList();   
        },
    }
    
</script>