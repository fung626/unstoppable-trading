<template>
    <CCard v-if="allowed">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <CRow class="p-2">
                <CCol sm="12">
                    <h4 id="duty" class="card-title mb-0">
                        {{ $t("dutylist") }}
                    </h4>
                </CCol>
            </CRow>
            <CRow class="p-2">
                <CCol class="text-right" :md="12">
                    <CButtonGroup>
                        <CButton
                            v-for="t in types"
                            :key="t.value"
                            :color="t.value === type ? 'primary' : 'light'"
                            :disabled="loading"
                            @click="onTypeChange(t)"
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
                @update:modelValue="getEvents"
            >
                <template v-slot:event="{ event }">
                    <!-- <CPopover
                        :title="`${event.title} ${$t('duty')}`"
                        :content="`${event.data.start} - ${event.data.end}`"
                        placement="bottom"
                    >
                        <template #toggler="{ id, on }">
                            <button
                                class="d-flex align-items-center rounded shadow-lg px-2 py-1 mx-2"
                                :aria-describedby="id"
                                v-on="on"
                                :style="{
                                    backgroundColor: event.allDay
                                        ? '#3462E3'
                                        : '#5A5A5A',
                                    color: 'white',
                                }"
                            >
                                <div
                                    class="rounded-circle p-2"
                                    :style="{
                                        backgroundColor: event.color,
                                        width: '6px',
                                        height: '6px',
                                    }"
                                ></div>
                            </button>
                        </template>
                    </CPopover> -->
                    <div
                        class="d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2"
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
                        <span class="px-2">
                            {{ event.title }}
                        </span>
                    </div>
                </template>
            </v-calendar>
            <CRow v-if="selectedEvent" class="my-4">
                <CCol :sm="12" :md="12">
                    <CCard>
                        <CCardBody>
                            <div class="d-flex align-items-center">
                                <div
                                    class="d-flex rounded align-items-center justify-content-center me-3"
                                    :style="{
                                        backgroundColor: selectedEvent.color,
                                        width: '26px',
                                        height: '26px',
                                    }"
                                ></div>
                                <div
                                    class="d-flex flex-column justify-content-center"
                                >
                                    <CLink
                                        :href="`#/duty/details/${selectedEvent.id}`"
                                    >
                                        {{
                                            `${
                                                selectedEvent.data.user.name
                                            } ${$t("duty")}`
                                        }}
                                    </CLink>
                                    <label>
                                        {{
                                            `${selectedEvent.data.start} - ${selectedEvent.data.end}`
                                        }}
                                    </label>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
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
    name: "DutyCalendar",
    props: {
        userId: null,
    },
    computed: {
        ...mapState(["users/duty/calendar"]),
        events() {
            let temp = [];
            // let events = [];
            if (this["users/duty/calendar"]) {
                let data = this["users/duty/calendar"].data;
                for (const item of data) {
                    // let format = "H:mm";
                    let start = new Date(item["start"]);
                    let end = new Date(item["end"]);
                    let name = item["user"] ? `${item["user"]["name"]} ` : "";
                    // let time = `${moment(start).format(format)} - ${moment(
                    //     end
                    // ).format(format)}`;
                    temp.push({
                        data: item,
                        title: `${name}`,
                        start: start,
                        end: end,
                        color: item.color ? item.color : "cyan",
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
            focus: [new Date()],
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
        };
    },
    mounted() {
        // this.fetch();
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
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            self.selectedEvent = null;
            let data = {
                user_id: this.userId,
                from: moment(start).format("Y-MM-DD"),
                to: moment(end).format("Y-MM-DD"),
            };
            this.$store
                .dispatch("users/duty/calendar/get", data)
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
            // console.log(event);
            this.selectedEvent = event;
            // this.type = type.value;
            // this.$forceUpdate();
        },
        allowed() {
            if (this.$store.getters.isAdmin) {
                return true;
            }
            if (this.$store.getters.authUser.id === this.userId) {
                return true;
            }
            return false;
        },
        onTypeChange(type) {
            this.type = type.value;
            // console.log(this.type);
            // this.$forceUpdate();
        },
    },
};
</script>
