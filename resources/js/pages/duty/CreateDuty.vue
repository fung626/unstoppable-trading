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
                        :search-input.sync="autocomplete.user.search"
                        required
                        outlined
                        dense
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="id"
                        :label="$t('user')"
                        return-object
                        :error="errors.user ? true : false"
                        :error-messages="errors.user"
                    ></v-autocomplete>
                    <v-menu
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                :label="$t('date')"
                                outlined
                                dense
                                clearable
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error="errors.date ? true : false"
                                :error-messages="errors.date"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            @input="dateMenu = false"
                        ></v-date-picker>
                    </v-menu>
                    <v-row>
                        <c-col md="6" sm="6">
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
                        </c-col>
                        <c-col md="6" sm="6">
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
                        </c-col>
                    </v-row>
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
import { DutyCalendar } from "../../components";
export default {
    name: "CreateDuty",
    components: {
        DutyCalendar
    },
    data() {
        return {
            loading: false,
            user: "",
            date: "",
            start: "",
            end: "",
            errors: {},
            dateMenu: false,
            autocomplete: {
                user: {
                    items: [],
                    loading: false
                }
            }
        };
    },
    watch: {
        "autocomplete.user.search": function(val) {
            let self = this;
            let cli = self.autocomplete.user;
            if (cli.items.length > 0 || cli.loading) {
                return;
            }
            self.autocomplete.user.loading = true;
            let data = {
                user_id: self.userId,
                role: "EMPLOYEE"
            };
            this.$store
                .dispatch("user/get", data)
                .then(response => {
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
                .catch(error => {
                    self.autocomplete.user.loading = false;
                });
        }
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
                date: self.date,
                start: self.start,
                end: self.end
            };
            this.$store
                .dispatch("user/duty/create", data)
                .then(response => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
                });
        }
    }
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
