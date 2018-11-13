<template>
    <div class="address">
        <div class="editAddress">
            <dl>
                <dt>联系人：</dt>
                <dd><input type="text" value="" placeholder="请填写收货人的姓名" name=""></dd>
            </dl>
            <dl>
                <dt></dt>
                <dd><a href="#" class="cur wrongIcon">先生</a><a href="#" class="wrongIcon">女士</a></dd>
            </dl>
            <dl>
                <dt>手机号：</dt>
                <dd><input type="text" value="" placeholder="请填写收货人的姓名" name=""></dd>
            </dl>
            <dl>
                <dt>收货地址：</dt>
                <dd><input type="text" value="" placeholder="请填写收货地址" name=""></dd>
            </dl>
            <dl>
                <dt>门牌号：</dt>
                <dd><input type="text" value="" placeholder="详细地址，例：16号楼5层301室"></dd>
            </dl>
            <button onclick="">保存地址</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "edit-address"
    }
</script>

<style scoped>

</style>