<template>
    <div>
        <div class="vld-parent">
            <loading :active.sync="isLoading"></loading>
        </div>
        <div class="row">
            <div class="col-md-4 mb-4" v-for="(item,key) in products" :ket="key">
                <div class="card border-0 shadow-sm mt-3 h-100">
                    <div style="height: 170px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">分類</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.description}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 2,800 元</del>
                        <div class="h5">現在只要 1,400 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
                </div>
        </div>
        <pagination :author="pagination" v-on:increment="getProducts"></pagination>
        <!--Modal-->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header text-dark">
                    <h3 class="modal-title" id="exampleModalLabel">
                    <span class="font-weight-bold">{{product.title}}</span>
                    </h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <img class="card-img-top" :src= "product.imageUrl" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{product.description}}</h5>
                            <div class="d-flex justify-content-between align-items-end">
                                <del class="h4">原價{{product.origin_price}}元</del>
                                <strong class="h2">現在只要{{product.price}}元</strong>
                            </div>

                            <div class="form-group mt-3">
                                <select class="form-control form-control-lg" aria-label="Default select example">
                                <option selected disabled value="">---選購商品---</option>
                                <option value="1">選購1件</option>
                                <option value="2">選購2件</option>
                                <option value="3">選購3件</option>
                                </select>
                            </div> 
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="h4 text-muted">小計 {{product.price}} 元</span>
                    <button type="button" class="btn btn-primary">加到購物車</button>
                </div>
                </div>
            </div>
        </div>
        <!--Modal-->
    </div>
</template>


<script>
    import $ from 'jquery';
    import pagination from './pagination';

    export default{
        data(){
            return {
                pagination:{},
                products:[],
                product:{},
                tempProduct:{},
                isLoading:false,
                status:{
                    loadingItem: ''
                }
            }
        },
        methods:{
            getProducts(page = 1){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    
                    vm.isLoading = false;
                    vm.products = response.data.products;
                    
                    vm.pagination = response.data.pagination;
                })
            },
            getProduct(id){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
                vm.status.loadingItem = id;
                this.$http.get(api).then((response) => {
                    $('#productModal').modal('show');
                    vm.product = response.data.product;
                    console.log(vm.product);
                    vm.status.loadingItem = '';
                })
            }
        },
        created(){
            this.getProducts();   
        },
        components:{
            pagination,
        }
    }
    
</script>