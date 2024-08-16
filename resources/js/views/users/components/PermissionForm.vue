<template>
    <CCard class="border-0">
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <CRow
                class="d-flex align-items-center align-items-start border-bottom"
                v-for="(_, key) in formData.items"
                v-bind:key="`${key}`"
            >
                <CCol class="h-100" :md="9" :sm="6">
                    <div class="d-flex flex-column">
                        <span class="h-100">
                            {{ $t(`permission.${key}.title`) }}
                        </span>
                        <span class="h-100">
                            {{ $t(`permission.${key}.description`) }}
                        </span>
                    </div>
                </CCol>
                <CCol :md="3" :sm="6">
                    <div v-if="formData.user.role === 'ADMIN'" class="p-2">
                        <v-switch
                            v-model="formData.items[key]"
                            color="indigo"
                            inset
                            disabled
                            hide-details
                        ></v-switch>
                    </div>
                    <div v-else class="p-2">
                        <v-switch
                            v-model="formData.items[key]"
                            color="indigo"
                            inset
                            hide-details
                        ></v-switch>
                    </div>
                </CCol>
            </CRow>
            <form class="py-2">
                <CButton @click="update" color="primary" class="px-4">
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
</template>
<script>
//
import { roles } from "@/constants";

export default {
    name: "PermissionForm",
    props: {
        id: null,
    },
    data() {
        return {
            formData: {},
            errors: {},
            fetchLoading: false,
            updateLoading: false,
            roles: roles,
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
                id: self.$props.id,
            };
            this.$store
                .dispatch("users/permission/get", data)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    // console.log(response.data.data);
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
            let data = {
                ...self.formData,
                id: self.$props.id,
            };
            this.$store
                .dispatch("users/permission/update", data)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.errors = {};
                    self.updateLoading = false;
                })
                .catch((error) => {
                    self.errors = error.response.data?.data;
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
