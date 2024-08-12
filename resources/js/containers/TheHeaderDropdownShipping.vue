<template>
    <div>
        <CDropdown
            inNav
            class="c-header-nav-items"
            placement="bottom-end"
            add-menu-classes="pt-0"
        >
            <template #toggler>
                <CHeaderNavLink>
                    <CHeaderNavLink>
                        <CIcon name="cil-truck" />
                        <div v-if="show()">
                            <CBadge color="info">
                                {{ data.length }}
                            </CBadge>
                        </div>
                    </CHeaderNavLink>
                </CHeaderNavLink>
            </template>
            <CDropdownHeader tag="div" class="text-center" color="light">
                <strong>{{ $t("shipping.title") }}{{ $t("table") }}</strong>
            </CDropdownHeader>
            <div v-if="show()">
                <CDropdownItem v-for="item in data" :key="item.id">
                    {{ item.goods.name }} － {{ item.color }} {{ item.size }} －
                    {{ $t("unit") }} {{ item.unit }}
                </CDropdownItem>
            </div>
            <div v-else>
                <CDropdownItem>
                    {{ $t("empty") }}
                </CDropdownItem>
            </div>
            <CDropdownDivider />
            <CDropdownItem to="/shipping/create">
                {{ $t("button.confirm") }}
            </CDropdownItem>
            <CDropdownItem v-if="show()" @click="clear">
                {{ $t("button.clear") }}
            </CDropdownItem>
        </CDropdown>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TheHeaderDropdownShipping",
    computed: {
        ...mapState(["goods/shipping"]),
        data() {
            return this["goods/shipping"].shippingData;
        },
    },
    methods: {
        clear() {
            this.$store.dispatch("goods/shippings/clear");
        },
        show() {
            return this.data.length > 0 ? true : false;
        },
    },
};
</script>
