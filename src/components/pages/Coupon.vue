<template>
    <div>
        <div class="vld-parent">
            <loading :active.sync="isLoading"></loading>
        </div>
        <div class="text-right mt-4">
            <button type="button" class="btn btn-primary" @click="openModal(true,'建立新優惠券')">
                建立新優惠券
            </button>
            
        </div>
        <table class="table mt-4">
            <thead>
                <th width="120">名稱</th>
                <th width="80">折扣百分比</th>
                <th width="80">到期日</th>
                <th width="80">是否啟用</th>
                <th width="80">編輯</th>
            </thead>
            <tbody>
                <tr v-for="(item, key) in products" :key="key">
                    <td>{{item.title}}</td>
                    <td>{{item.percent}}</td>
                    <td>{{item.due_date}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false,'修改優惠券', item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <pagination :has_pre="pagination.has_pre" :has_next="pagination.has_next" :total_page="pagination.total_pages" :current_page="pagination.current_page" v-on:increment="getList"></pagination>

        <!--優惠券Modal-->
        <div class="modal fade" id="CouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span></span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="coupon-title">標題</label>
                                <input type="text" class="form-control" id="coupon-title"
                                    placeholder="請輸入優惠券名稱" v-model="tempProduct.title">
                            </div>
                        </div>
                        
                        <div class="col-12">
                            <div class="form-group">
                                <label for="coupon-code">優惠碼</label>
                                <input type="text" class="form-control" id="coupon-code"
                                    placeholder="請輸入優惠碼" v-model="tempProduct.code">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="Duedate">到期日</label>
                                <input class="form-control" type="date" id="Duedate" placeholder="2014-09-18" v-model="tempProduct.due_date">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="percent">折扣百分比</label>
                                <input type="text" class="form-control" id="percent"
                                    placeholder="請輸入優惠券名稱" v-model="tempProduct.percent">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">
                                是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
                </div>
                </div>
            </div>
        </div>
        <!--優惠券Modal-->
    </div>
</template>


<script>
    import $ from 'jquery';
    import pagination from './pagination';
    export default{
        data(){
            return{
                tempProduct:{},
                products:[],
                pagination:{},
                isNew:false,
                isLoading:false,
            }
        },
        components:{
            pagination
        },
        methods:{
            getList(page = 1){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    vm.isLoading = false;
                    vm.pagination = response.data.pagination;
                    vm.products = response.data.coupons;   
                })
            },
            openModal(isNew, content, item){
                const vm = this;
                $('#CouponModal').modal('show');
                if(isNew){
                    vm.tempProduct = {};
                    vm.isNew = true;
                } else {
                    vm.tempProduct = Object.assign({}, item);
                    this.isNew = false;
                }
                $('#CouponModal').find('.modal-title').text(content)
            },
            delModal(item){
                $('#delCouponModal').modal('show');
                this.tempProduct = Object.assign({},item);
            },
            delCoupon(){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
                this.$http.delete(api).then((response) => {
                    if(response.data.success){
                        console.log('刪除折價券成功');
                        $('#delCouponModal').modal('hide');
                        vm.getList();
                    } else{
                        console.log('刪除折價券失敗');
                        $('#delCouponModal').modal('hide');
                        vm.getList();
                    }
                    
                    
                })
            },
            updateCoupon(){
                const vm = this;
                let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
                let httpMode = 'post';
                vm.isLoading = true;
                if(!vm.isNew){
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
                    httpMode = 'put';
                }
                this.$http[httpMode](api, {data:vm.tempProduct}).then((response) => {
                   if(response.data.success){
                        vm.isLoading = false;
                       $('#CouponModal').modal('hide');
                       console.log('建立成功');
                       vm.getList();
                   } else {
                        $('#productModal').modal('hide');
                        vm.getList();
                        console.log('建立優惠券失敗');
                    } 
                })
                
               
            }
        },
        created(){
            this.getList();   
        },
    }
    
</script>