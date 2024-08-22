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
                            @click="onTypeClick(t)"
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
                @update:pages="fetch"
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
                        title: `${name}`,
                        data: item,
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
            selectedElement: null,
            selectedOpen: false,
        };
    },
    mounted() {
        // this.fetch();
        const adapter = useDate();
        this.fetch({
            start: adapter.startOfDay(adapter.startOfMonth(new Date())),
            end: adapter.endOfDay(adapter.endOfMonth(new Date())),
        });
    },
    methods: {
        fetch({ start, end }) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
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
        click(event) {
            console.log(event);
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
        onTypeClick(type) {
            this.type = type.value;
            // console.log(this.type);
            // this.$forceUpdate();
        },
    },
};
</script>
