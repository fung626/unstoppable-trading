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
                <CCol sm="3">
                    <CButton @click="prev" color="primary" :disabled="loading">
                        {{ "＜ PREV" }}
                    </CButton>
                    <CButton @click="next" color="primary" :disabled="loading">
                        {{ "NEXT ＞" }}
                    </CButton>
                </CCol>
                <CCol sm="9">
                    <v-select
                        v-model="type"
                        :items="types"
                        item-text="name"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </CCol>
            </CRow>
            <v-calendar
                ref="calendar"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                @change="fetch"
            ></v-calendar>
        </CCardBody>
    </CCard>
</template>

<script>
//
import moment from "moment";
import { mapState } from "vuex";
import { calendarTypes } from "../constants";

export default {
    name: "DutyCalendar",
    props: {
        userId: null
    },
    components: {},
    computed: {
        ...mapState(["user/duty/calendar"]),
        events() {
            let temp = [];
            if (this["user/duty/calendar"]) {
                let data = this["user/duty/calendar"].data;
                for (const item of data) {
                    let format = "H:mm";
                    let name = item["user"] ? item["user"]["name"] : "";
                    let start = new Date(item["start"]);
                    let end = new Date(item["end"]);
                    temp.push({
                        name: `${moment(start).format(format)} - ${moment(
                            end
                        ).format(format)} ${name} `,
                        start: start,
                        end: end,
                        color: "cyan",
                        timed: false
                    });
                }
            }
            return temp;
        }
    },
    data() {
        return {
            loading: false,
            type: "month",
            types: calendarTypes,
            mode: "stack",
            modes: ["stack", "column"],
            weekday: [0, 1, 2, 3, 4, 5, 6],
            weekdays: [
                { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
                { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
                { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
                { text: "Mon, Wed, Fri", value: [1, 3, 5] }
            ]
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
                user_id: this.userId,
                from: start.date,
                to: end.date
            };
            this.$store
                .dispatch("user/duty/calendar/get", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        allowed() {
            if (this.$store.getters.isAdmin) {
                return true;
            }
            if (this.$store.getters.authUser.id === this.userId) {
                return true;
            }
            return false;
        }
    }
};
</script>
