<template>
    <div>
        <StockCalendar cType="shipping" />
        <ShippingTable />
    </div>
</template>
<script>
//
import { StockCalendar } from "@/components";
import ShippingTable from "./components/ShippingTable.vue";

export default {
    name: "Shippings",
    components: {
        ShippingTable,
        StockCalendar,
    },
};
</script>
