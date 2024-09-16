<template>
    <CCard>
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <CRow class="p-2">
                <CCol class="text-left">
                    <h4 class="card-title mb-0">
                        {{ $t("calendar.title") }}
                    </h4>
                </CCol>
                <CCol class="text-right">
                    <CButtonGroup>
                        <CButton
                            v-for="t in types"
                            :key="t.value"
                            :color="t.value === type ? 'primary' : 'light'"
                            :disabled="loading"
                            @click="onTypeChange(t.value)"
                        >
                            {{ t.name }}
                        </CButton>
                    </CButtonGroup>
                </CCol>
            </CRow>
            <v-calendar
                class="p-4"
                ref="calendar"
                v-model="focus"
                :weekdays="weekday"
                :view-mode="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                @click:event="showEvent"
                @update:modelValue="getEvents"
            >
                <template v-slot:event="{ event }">
                    <button
                        class="d-flex align-items-center rounded shadow-lg px-2 py-1 mx-2"
                        :style="{
                            backgroundColor: event.allDay
                                ? '#3462E3'
                                : '#5A5A5A',
                            color: 'white',
                        }"
                        @click="click(event)"
                    >
                        <div
                            class="rounded-circle p-2"
                            :style="{
                                backgroundColor: event.color,
                                width: '6px',
                                height: '6px',
                            }"
                        ></div>
                        <span class="px-2">{{ event.title }}</span>
                    </button>
                </template>
            </v-calendar>
            <CRow v-if="selectedEvent" class="my-4">
                <CCol :sm="12" :md="12">
                    <CWidgetStatsF
                        color="primary"
                        :title="selectedEvent.data.name"
                        :value="`${selectedEvent.data.start} - ${selectedEvent.data.end}`"
                    >
                        <template #icon>
                            <CIcon icon="cil-calendar-check" size="sm" />
                        </template>
                    </CWidgetStatsF>
                </CCol>
            </CRow>
        </CCardBody>
    </CCard>
</template>

<script>
//
import { calendarTypes } from "@/constants";
import moment from "moment";
import { useDate } from "vuetify";
import { mapState } from "vuex";

export default {
    name: "StockCalendar",
    props: {
        cType: null,
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
                        name: `${item["generated_id"]}`,
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
            adapter: null,
            loading: false,
            focus: new Date(),
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
            selectedEvent: null,
            selectedElement: null,
            selectedOpen: false,
            events: [],
            config: {
                locale: "zh-CN",
                defaultMode: "month",
            },
        };
    },
    mounted() {
        // console.log(this.$refs.calendar);
        this.adapter = useDate();
        this.fetch({
            start: this.adapter.startOfDay(
                this.adapter.startOfMonth(new Date())
            ),
            end: this.adapter.endOfDay(this.adapter.endOfMonth(new Date())),
        });
    },
    methods: {
        getEvents(e) {
            this.fetch({
                start: this.adapter.startOfDay(this.adapter.startOfMonth(e[0])),
                end: this.adapter.endOfDay(this.adapter.endOfMonth(e[0])),
            });
        },
        fetch({ start, end }) {
            // console.log(start, end);
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                type: this.cType,
                from: moment(start).format("Y-MM-DD"),
                to: moment(end).format("Y-MM-DD"),
            };
            // console.log(data);
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
            console.log(event);
        },
        click(event) {
            console.log(event);
            this.selectedEvent = event;
            // this.type = type.value;
            // this.$forceUpdate();
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
