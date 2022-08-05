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
                    <h4 id="duty" class="card-title mb-0">
                        {{ $t("dutylist") }}
                    </h4>
                </CCol>
            </CRow>
            <CRow class="p-2">
                <CCol sm="3">
                    <CButton
                        @click="prev"
                        color="primary"
                        :disabled="loading"
                        size="sm"
                    >
                        {{ "＜ PREV" }}
                    </CButton>
                    <CButton
                        @click="next"
                        color="primary"
                        :disabled="loading"
                        size="sm"
                    >
                        {{ "NEXT ＞" }}
                    </CButton>
                </CCol>
                <CCol sm="9">
                    <v-select
                        v-model="type"
                        :items="types"
                        :item-text="item => $t(item)"
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

export default {
    name: "DutyCalendar",
    components: {},
    computed: {
        ...mapState(["user/duty"]),
        events() {
            let data = this["user/duty"].data;
            let temp = [];
            // moment().format('dddd');
            for (const item of data) {
                let format = "hh:mm";
                let name = item["user"]["name"];
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
            return temp;
        }
    },
    data() {
        return {
            loading: false,
            type: "month",
            types: ["month", "week", "day", "4 days"],
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
                from: start.date,
                to: end.date
            };
            this.$store
                .dispatch("user/duty/get", data)
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
        }
    }
};
</script>
