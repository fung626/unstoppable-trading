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
                    <CDropdownItem
                        v-for="(item, index) in data.slice(0, 10)"
                        :key="item.id"
                    >
                        <div v-if="index < 10">
                            {{ item.goods.name }} － {{ item.color }}
                            {{ item.size }} － {{ $t("unit") }} {{ item.unit }}
                        </div>
                    </CDropdownItem>
                    <CDropdownItem v-if="data.length > 10"> ... </CDropdownItem>
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
        ...mapState(["goods/shipping-cart"]),
        data() {
            return this["goods/shipping-cart"].items;
        },
    },
    methods: {
        clear() {
            this.$store.dispatch("goods/shipping-cart/clear");
        },
        show() {
            return this.data.length > 0 ? true : false;
        },
        // remove(item) {
        //     console.log(item);
        //     this.$store.dispatch("goods/shipping-cart/remove", {
        //         data: { id: item.id },
        //     });
        // },
    },
};
</script>
