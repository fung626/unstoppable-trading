<template>
    <div>
        <DutyCalendar v-if="user" :userId="user.id" />
        <CCard class="p-4">
            <CCardBody>
                <h4>{{ $t("create") }}</h4>
                <hr />
                <form>
                    <v-autocomplete
                        v-model="user"
                        :items="autocomplete.user.items"
                        :loading="autocomplete.user.loading"
                        required
                        outlined
                        dense
                        hide-no-data
                        hide-selected
                        item-title="name"
                        item-value="id"
                        :label="$t('user')"
                        return-object
                        :error="errors.user ? true : false"
                        :error-messages="errors.user"
                    >
                    </v-autocomplete>
                    <v-date-input
                        :label="$t('date')"
                        prepend-icon=""
                        clearable
                        outlined
                    ></v-date-input>
                    <CRow>
                        <CCol md="6" sm="6">
                            <v-text-field
                                v-model="start"
                                :label="$t('start')"
                                :error="errors.start ? true : false"
                                :error-messages="errors.start"
                                type="time"
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </CCol>
                        <CCol md="6" sm="6">
                            <v-text-field
                                v-model="end"
                                :label="$t('end')"
                                :error="errors.end ? true : false"
                                :error-messages="errors.end"
                                type="time"
                                required
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </CCol>
                    </CRow>
                    <CRow class="g-0 mb-2">
                        <CCol md="12">
                            {{
                                `${this.$t("calendar.title")} ${this.$t(
                                    "color"
                                )}`
                            }}
                        </CCol>
                        <CCol md="12">
                            <TextFieldColorPicker v-model="color" />
                        </CCol>
                    </CRow>
                    <CButton @click="submit" color="primary" class="px-4">
                        {{ $t("button.submit") }}
                        <v-progress-circular
                            v-if="loading"
                            indeterminate
                            color="primary"
                            :size="15"
                        ></v-progress-circular>
                    </CButton>
                </form>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
import { DutyCalendar, TextFieldColorPicker } from "@/components";

export default {
    name: "CreateDuty",
    components: {
        DutyCalendar,
        TextFieldColorPicker,
    },
    computed: {
        datesText() {
            if (this.dates.length === 1) {
                return this.dates;
            }
            if (this.dates.length > 1) {
                let f = new Date(this.dates[0]);
                let t = new Date(this.dates[1]);
                if (f.toDateString() === t.toDateString()) {
                    return this.dates[0];
                }
                let sorted = this.dates.sort(
                    (a, b) => new Date(a) - new Date(b)
                );
                this.dates = sorted;
                return sorted.join(" － ");
            }
        },
    },
    data() {
        return {
            loading: false,
            user: "",
            dates: [],
            start: "",
            end: "",
            color: "#0D47A1FF",
            errors: {},
            dateMenu: false,
            autocomplete: {
                user: {
                    items: [],
                    loading: false,
                    search: "",
                },
            },
        };
    },
    watch: {
        "autocomplete.user.search": function (val) {},
    },
    mounted() {
        this.fetch();
    },
    methods: {
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                user: self.user,
                dates: self.dates,
                start: self.start,
                end: self.end,
                color: self.color,
            };
            this.$store
                .dispatch("users/duty/create", data)
                .then((response) => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch((error) => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
                });
        },
        fetch() {
            let self = this;
            let cli = self.autocomplete.user;
            if (cli.items.length > 0 || cli.loading) {
                return;
            }
            self.autocomplete.user.loading = true;
            let data = {
                user_id: self.userId,
                role: "EMPLOYEE",
            };
            this.$store
                .dispatch("users/get", data)
                .then((response) => {
                    let data = response.data;
                    self.autocomplete.user.items = response.data;
                    self.autocomplete.user.loading = false;
                    if (self.$route.params.userId) {
                        let id = self.$route.params.userId;
                        for (const item of data) {
                            if (`${item.id}` === `${id}`) {
                                self.user = item;
                                // console.log(item);
                                break;
                            }
                        }
                    }
                })
                .catch((error) => {
                    self.autocomplete.user.loading = false;
                });
        },
    },
};
</script>

<style scoped>
.v-text-field >>> input {
    font-size: 0.8em;
    font-weight: 100;
}
.v-text-field >>> label {
    font-size: 0.8em;
}
.v-text-field >>> button {
    font-size: 0.8em;
}
</style>
