<template>
    <div>
        <DutyCalendar v-if="formData.user.id" :userId="formData.user.id" />
        <CCard class="p-4 my-4">
            <v-progress-linear
                :active="fetchLoading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
            <CCardBody>
                <h4>{{ $t("details") }}</h4>
                <hr />
                <form>
                    <v-text-field
                        v-model="formData.user.name"
                        :label="$t('user')"
                        outlined
                        dense
                        disabled
                    ></v-text-field>
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
                                v-model="formData.date"
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
                            v-model="formData.date"
                            @input="dateMenu = false"
                        ></v-date-picker>
                    </v-menu>
                    <CRow>
                        <CCol md="6" sm="6">
                            <v-text-field
                                v-model="formData.formatted_start"
                                :label="$t('start')"
                                :error="errors.formatted_start ? true : false"
                                :error-messages="errors.formatted_start"
                                type="time"
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </CCol>
                        <CCol md="6" sm="6">
                            <v-text-field
                                v-model="formData.formatted_end"
                                :label="$t('end')"
                                :error="errors.formatted_end ? true : false"
                                :error-messages="errors.formatted_end"
                                type="time"
                                required
                                outlined
                                dense
                                clearable
                            ></v-text-field>
                        </CCol>
                    </CRow>
                    <CRow class="my-4">
                        <CCol md="12">
                            {{
                                `${this.$t("calendar.title")} ${this.$t(
                                    "color"
                                )}`
                            }}
                        </CCol>
                        <CCol md="12">
                            <TextFieldColorPicker v-model="formData.color" />
                        </CCol>
                    </CRow>
                    <CButton
                        @click="update"
                        color="primary"
                        class="px-4"
                        :disabled="!formData.editable"
                    >
                        <v-progress-circular
                            v-if="updateLoading"
                            indeterminate
                            :size="15"
                        ></v-progress-circular>
                        {{ $t("button.update") }}
                    </CButton>
                </form>
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
import { DutyCalendar, TextFieldColorPicker } from "@/components";

export default {
    name: "DutyDetails",
    components: {
        DutyCalendar,
        TextFieldColorPicker,
    },
    data() {
        return {
            formData: {
                user: {},
            },
            errors: {},
            dateMenu: false,
            fetchLoading: false,
            updateLoading: false,
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.fetchLoading) {
                return;
            }
            self.fetchLoading = true;
            let data = {
                id: self.$route.params.id,
            };
            this.$store
                .dispatch("users/duty/details", data)
                .then((response) => {
                    // console.log(response.data);
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.fetchLoading = false;
                })
                .catch((error) => {
                    self.fetchLoading = false;
                });
        },
        update() {
            let self = this;
            if (self.updateLoading) {
                return;
            }
            self.updateLoading = true;
            console.log(self.formData);
            this.$store
                .dispatch("users/duty/update", self.formData)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.updateLoading = false;
                    // console.log(response);
                })
                .catch((error) => {
                    self.updateLoading = false;
                });
        },
    },
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
.v-text-field--outlined >>> fieldset {
    border-color: #ccc;
}
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
