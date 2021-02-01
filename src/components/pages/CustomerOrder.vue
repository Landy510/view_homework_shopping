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
                    <div class="d-flex justify-content-between align-items-baseline flex-column flex-md-row">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 {{item.origin_price}} 元</del>
                        <div class="h5">現在只要 {{item.price}} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
                </div>
        </div>
        <pagination :author="pagination" v-on:increment="getProducts"></pagination>

        <!---->
            <table class="table w-50 mt-5" v-if="cartTotal.length!==0">
                <thead>
                    <tr>
                    <th scope="col" width="100"></th>
                    <th scope="col">品名</th>
                    <th scope="col" width="100">數量</th>
                    <th scope="col" width="100">單價</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in cartTotal" :key="key">
                        <td>
                            <a class="btn fas fa-trash-alt btn-outline-danger rounded" @click.prevent="delCart(item.id)"></a> 
                        </td>
                        <td>{{item.product.title}}
                            <p v-if="item.coupon" class="text-success">已套用優惠券</p>
                        </td>
                        
                        <td>{{item.qty}}/{{item.unit}}</td>
                        <td class="text-right">{{item.total}}</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{cart_total}}</td>
                    </tr>
                    <tr v-if="cart_total!==cart_finaltotal">
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{cart_finaltotal}}</td>
                    </tr>
                </tbody>
                </table>
                <div class="input-group w-50">
                    <input type="text" class="form-control" placeholder="Username" v-model="coupon_code" aria-label="Username" aria-describedby="basic-addon1">
                    <div class="input-group-append">
                        <button class="btn btn-primary" id="basic-addon1" @click="addCouponCode">套用優惠碼</button>
                    </div>
                </div>

        <!---->
        <h2 class="h1 mt-5">結帳頁面</h2>
        <div class="my-5 row">
        <validation-observer  class="col-md-6" v-slot="{ invalid, handleSubmit  }">
            <form @submit.prevent="handleSubmit(submitForm)">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                    <!-- 輸入框 -->
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" name="email" 
                            class="form-control" v-model="form.user.email" :class="classes">
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                    
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                    <!-- 輸入框 -->
                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input id="username" type="text" name="姓名" 
                            class="form-control" v-model="form.user.name" :class="classes" placeholder="輸入姓名" >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                    
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                    <!-- 輸入框 -->
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input id="usertel" type="tel" name="電話" 
                            class="form-control" v-model="form.user.tel" :class="classes" placeholder="請輸入電話" >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                    <!-- 輸入框 -->
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input id="useraddress" type="text" name="地址" 
                            class="form-control" v-model="form.user.address" :class="classes" placeholder="請輸入地址" >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                </validation-provider>

                <validation-provider v-slot="{ errors, classes }">
                    <!-- 輸入框 -->
                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                </validation-provider>
                

                <div class="text-right">
                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                </div>
            <!--
                <div class="form-group">
                <label for="username">收件人姓名</label>
                <input type="text" class="form-control"  v-validate="'required'" name="name" id="username"
                    v-model="form.user.name" placeholder="輸入姓名" :class="{'is-invalid': errors.has('name')}">
                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                </div>
            
                <div class="form-group">
                <label for="usertel">收件人電話</label>
                <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                </div>
            
                <div class="form-group">
                <label for="useraddress">收件人地址</label>
                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                    placeholder="請輸入地址">
                <span class="text-danger">地址欄位不得留空</span>
                </div>
            
                <div class="form-group">
                <label for="comment">留言</label>
                <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>

                <div class="text-right">
                    <button class="btn btn-danger" type="submit" @click.prevent="createOrder" :disabled="invalid">送出訂單</button>
                </div>
            -->
                
            </form>
        
        </validation-observer>
            
        </div>

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
                                <select class="form-control form-control-lg" aria-label="Default select example" v-model="product.num">
                                    <option :value="num" v-for="num in 10" :key="num">選購{{num}} {{product.unit}}</option>
                                    
                                </select>
                            </div> 
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="h4 text-muted">小計 {{product.price*product.num}} 元</span>
                    <button type="button" class="btn btn-primary" @click="addToCart(product.id, product.num)">加到購物車</button>
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
                },
                cartTotal:[],
                cart_total:'',
                cart_finaltotal:'',
                coupon_code:'',
                form:{
                    user:{
                        name:'',
                        email:'',
                        tel:'',
                        address:'',
                    },
                    message:''
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
                    
                    vm.status.loadingItem = '';
                })
            },
            addToCart(id, qty = 1){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                vm.status.loadingItem = id;
                vm.isLoading = true;
                const cart = {
                    product_id : id,
                    qty
                }
                this.$http.post(api, {data: cart}).then((response) => {  
                    vm.isLoading = false;
                    vm.status.loadingItem = '';
                    $('#productModal').modal('hide');
                    vm.getCart(); 
                })
                
            },
            getCart(){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                this.$http.get(api).then((response) => {  
                    console.log(response);
                    vm.cartTotal = response.data.data.carts;
                    vm.cart_total = response.data.data.total;
                    vm.cart_finaltotal = response.data.data.final_total;
                })
            },
            delCart(id){
                const vm = this;
                
                vm.isLoading = true;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
                this.$http.delete(api).then((response) => {  
                    this.getCart();
                    
                    vm.isLoading = false;
                })
                 
                
            },
            addCouponCode(){
                const vm = this; 
                vm.isLoading = true;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
                const coupon = {
                    code:vm.coupon_code
                }
                this.$http.post(api, {data:coupon}).then((response) => {  
                    this.getCart();
                    vm.isLoading = false;
                })
            },
            submitForm() {
                const vm = this; 
                const order = vm.form;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                vm.isLoading = true;
                this.$http.post(api,{data:order}).then((response) => {  
                    console.log('response', response);
                     console.log('response1', response.data.success);
                    if(response.data.success){
                        console.log('訂單已建立');
                        vm.$router.push(`/customer_CheckOut/${response.data.orderId}`);
                    }
                })
                vm.isLoading = false;
            },
            // createOrder(){
            //     const vm = this; 
            //     const order = vm.form;
            //     const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            //     vm.isLoading = true;
            //     this.$validator.validate().then(valid => {
            //         if (!valid) {
            //             console.log('欄位不完整');
            //         } else {
            //             this.$http.post(api,{data:order}).then((response) => {  
            //                 console.log('訂單已建立');
            //                 console.log('訂單已建立', response);
                            
            //             })
            //         }
            //         vm.isLoading = false;
            //     });

            // }
        },
        created(){
            this.getProducts();  
            this.getCart(); 
        },
        components:{
            pagination,
        }
    }
    
</script>