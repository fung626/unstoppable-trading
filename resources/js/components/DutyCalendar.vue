<script setup>
import { onMounted, ref } from "vue";

const calendar = ref(null);

onMounted(() => {
    // calendar.value.$el
    console.log(calendar.value.$el);
});

function prev() {
    calendar.value.prev();
}
function next() {
    calendar.value.next();
}
</script>

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
                    <div class="d-flex justify-content-end px-2">
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
                            @click="$refs.calendar.prev()"
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
                        <CButton
                            @click="$refs.calendar.next()"
                            color="light"
                            :disabled="loading"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </CButton>
                    </CButtonGroup>
                </CCol>
            </CRow>
            <v-calendar
                ref="calendar"
                v-model="focus"
                :weekdays="weekday"
                type="week"
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
import moment from "moment";
import { mapState } from "vuex";

export default {
    name: "DutyCalendar",
    props: {
        userId: null,
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
                        name: ` ${moment(start).format(format)} - ${moment(
                            end
                        ).format(format)} ${name} `,
                        start: start,
                        end: end,
                        color: item.color ? item.color : "cyan",
                        timed: true,
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
            type: "week",
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
                user_id: this.userId,
                from: start.date,
                to: end.date,
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
            // console.log(event);
        },
        onTypeClick(type) {
            this.type = type.value;
            console.log(this.type);
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
    },
};
</script>
