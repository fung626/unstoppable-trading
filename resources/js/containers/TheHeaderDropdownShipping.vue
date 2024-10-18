<template>
    <CHeaderNav v-if="show()">
        <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle :caret="false">
                <div class="d-flex align-items-center justify-content-center">
                    <CIcon class="me-2" name="cil-truck" />
                    <CBadge
                        color="danger"
                        position="top-end"
                        shape="rounded-pill"
                    >
                        {{ data.length > 99 ? "99+" : data.length }}
                    </CBadge>
                    {{ $t("shipping.cart") }}
                </div>
            </CDropdownToggle>
            <CDropdownMenu class="pt-0">
                <CDropdownHeader
                    component="h6"
                    class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
                >
                    <strong>
                        {{ $t("shippings.title") }}{{ $t("table") }}
                    </strong>
                </CDropdownHeader>
                <div v-if="show()">
                    <CDropdownItem v-for="item in data" :key="item.id">
                        {{ item.goods.name }} － {{ item.color }}
                        {{ item.size }} － {{ $t("unit") }} {{ item.unit }}
                    </CDropdownItem>
                </div>
                <div v-else>
                    <CDropdownItem>
                        {{ $t("empty") }}
                    </CDropdownItem>
                </div>
                <CDropdownItem href="#/shippings/create">
                    <CIcon icon="cil-check-alt" /> {{ $t("button.confirm") }}
                </CDropdownItem>
                <CDropdownItem @click="clear">
                    <CIcon icon="cil-x" /> {{ $t("button.clear") }}
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    </CHeaderNav>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TheHeaderDropdownShipping",
    computed: {
        ...mapState(["goods/shippings"]),
        data() {
            return this["goods/shippings"].shippingItems;
        },
    },
    methods: {
        clear() {
            this.$store.dispatch("goods/shipping-cart/clear");
        },
        show() {
            return this.data.length > 0 ? true : false;
        },
    },
};
</script>
