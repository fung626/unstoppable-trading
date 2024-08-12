<template>
    <CCard>
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <CRow class="p-2">
                <CCol sm="12">
                    <h4 class="card-title mb-0">
                        {{ $t("calendar.title") }}
                    </h4>
                </CCol>
            </CRow>
            <CRow class="p-2">
                <CCol class="d-block d-md-none" sm="12">
                    <div class="d-flex justify-content-end">
                        <CButtonGroup>
                            <CButton
                                v-for="t in types"
                                :key="t.value"
                                :color="t.value === type ? 'primary' : 'light'"
                                :disabled="loading"
                                @click="onTypeClick(t)"
                            >
                                {{ t.name }}
                            </CButton>
                        </CButtonGroup>
                    </div>
                </CCol>
                <CCol class="d-block d-md-none" sm="12">
                    <div class="d-flex justify-content-between">
                        <CButton
                            @click="prev"
                            color="light"
                            :disabled="loading"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </CButton>
                        <CButton
                            @click="next"
                            color="light"
                            :disabled="loading"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </CButton>
                    </div>
                </CCol>
            </CRow>
            <CRow class="p-2">
                <CCol class="d-none d-md-block" sm="6">
                    <CButton @click="prev" color="light" :disabled="loading">
                        <v-icon>mdi-chevron-left</v-icon>
                    </CButton>
                </CCol>
                <CCol class="d-none d-md-block text-right" sm="6">
                    <CButtonGroup>
                        <CButton
                            v-for="t in types"
                            :key="t.value"
                            :color="t.value === type ? 'primary' : 'light'"
                            :disabled="loading"
                            @click="onTypeClick(t)"
                        >
                            {{ t.name }}
                        </CButton>
                    </CButtonGroup>
                    <CButton @click="next" color="light" :disabled="loading">
                        <v-icon>mdi-chevron-right</v-icon>
                    </CButton>
                </CCol>
            </CRow>
            <v-calendar
                ref="calendar"
                v-model="focus"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                @click:event="showEvent"
                @change="fetch"
            >
                <template v-slot:event="{ event }">
                    {{ event.name }}
                </template>
            </v-calendar>
        </CCardBody>
    </CCard>
</template>

<script>
//
import { calendarTypes } from "@/constants";
import { mapState } from "vuex";

export default {
    name: "StockCalendar",
    props: {
        stockType: null,
    },
    components: {},
    computed: {
        ...mapState(["goods/stocks/calendar"]),
        events() {
            let temp = [];
            if (this["goods/stocks/calendar"]) {
                let data = this["goods/stocks/calendar"].data;
                for (const item of data) {
                    let color = "cyan";
                    let status = this.$t(
                        `${this.stockType}status.${item["status"]}`
                    );
                    switch (item["status"]) {
                        case "PENDING":
                            color = "#F9B115";
                            break;
                        case "PROCESSING":
                            color = "#3399FF";
                            break;
                        case "DELIVERED":
                            color = "#2EB85C";
                            break;
                    }
                    let start = new Date(item["created_at"]);
                    let end = new Date(item["created_at"]);
                    temp.push({
                        name: `${item["generated_id"]} - ${status}`,
                        start: start,
                        end: end,
                        color: color,
                        timed: false,
                    });
                }
            }
            return temp;
        },
    },
    data() {
        return {
            loading: false,
            focus: "",
            type: "month",
            types: calendarTypes,
            mode: "stack",
            modes: ["stack", "column"],
            weekday: [0, 1, 2, 3, 4, 5, 6],
            weekdays: [
                { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
                { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
                { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
                { text: "Mon, Wed, Fri", value: [1, 3, 5] },
            ],
            selectedElement: null,
            selectedOpen: false,
        };
    },
    mounted() {
        // this.fetch();
    },
    methods: {
        fetch({ start, end }) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                type: this.stockType,
                from: start.date,
                to: end.date,
            };
            this.$store
                .dispatch("goods/stocks/calendar/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        showEvent({ nativeEvent, event }) {
            // console.log(event);
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        onTypeClick(type) {
            this.type = type.value;
            // console.log(this.type);
            // this.$forceUpdate();
        },
    },
};
</script>
