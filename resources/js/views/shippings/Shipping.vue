<template>
    <div>
        <StockCalendar stockType="shipping" />
        <ShippingTable />
    </div>
</template>
<script>
//
import { StockCalendar } from "@/components";
import ShippingTable from "./components/ShippingTable.vue";

export default {
    name: "Shipping",
    components: {
        ShippingTable,
        StockCalendar,
    },
};
</script>
