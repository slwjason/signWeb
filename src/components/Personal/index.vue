<template>
    <el-container id="admin-body">
        <el-header style="z-index: 1;height: 80px;margin-left: -20px">
            <Header style="position: absolute;width: 98%;"></Header>
        </el-header>
        <!--<el-row style="height: 100%;">-->
        <el-container>
            <el-aside style="height: 112%;margin-top:20px;width: 250px">
                <admin-menu></admin-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    import AdminMenu from "@/components/Personal/AdminMenu";
    import Header from "@/components/Personal/Header";

    export default {
        components: {AdminMenu, Header},
        name: "Index"
    }
</script>

<style scoped>
    .el-main{
        text-align: left;
    }
</style>
