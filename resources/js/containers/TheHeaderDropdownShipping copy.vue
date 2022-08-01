<template>
    <div :v-if="show()">
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

                        <CBadge color="info">
                            {{ data.length }}
                        </CBadge>
                    </CHeaderNavLink>
                </CHeaderNavLink>
            </template>
            <CDropdownHeader tag="div" class="text-center" color="light">
                <strong>{{ $t("shipping") }}{{ $t("table") }}</strong>
            </CDropdownHeader>
            <div :v-if="show()">
                <CDropdownItem v-for="item in data" :key="item.id">
                    {{ item.goods.name }} －
                    <div :v-if="item.barcode">{{ item.barcode }} －</div>
                    {{ $t("unit") }} {{ item.unit }}
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem to="/shipping/create">
                    {{ $t("button.confirm") }}
                </CDropdownItem>
                <CDropdownItem @click="clear">
                    {{ $t("button.clear") }}
                </CDropdownItem>
            </div>
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
        }
    },
    methods: {
        clear() {
            this.$store.dispatch("goods/shipping/clear");
        },
        show() {
            return this.data.length > 0;
        }
    }
};
</script>
