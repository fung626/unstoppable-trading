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
                <CCol class="d-none d-md-block" sm="1">
                    <CButton @click="prev" color="light" :disabled="loading">
                        <v-icon>mdi-chevron-left</v-icon>
                    </CButton>
                </CCol>
                <CCol class="d-none d-md-block text-right" sm="10">
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
                <CCol class="d-none d-md-block text-right" sm="1">
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
                @change="fetch"
            ></v-calendar>
        </CCardBody>
    </CCard>
</template>

<script>
//
import { calendarTypes } from "@/constants";
import moment from "moment";
import { mapState } from "vuex";

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
            // console.log(this.$refs);
            this.$refs.calendar.prev();
        },
        next() {
            // console.log(this.$refs);
            this.$refs.calendar.next();
        },
        onTypeClick(type) {
            this.type = type.value;
            // console.log(this.type);
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
        }
    }
};
</script>
