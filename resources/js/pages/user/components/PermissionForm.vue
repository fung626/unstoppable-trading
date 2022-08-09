<template>
    <CCard class="border-0">
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <div class="d-flex flex-wrap">
                <div v-for="(_, key) in formData.items" v-bind:key="`${key}`">
                    <div v-if="formData.user.role === 'ADMIN'" class="p-2">
                        <v-switch
                            v-model="formData.items[key]"
                            inset
                            :label="$t(key)"
                            disabled
                        ></v-switch>
                    </div>
                    <div v-else class="p-2">
                        <v-switch
                            v-model="formData.items[key]"
                            inset
                            :label="$t(key)"
                        ></v-switch>
                    </div>
                </div>
            </div>
            <form>
                <CButton @click="update" color="primary" class="px-4">
                    {{ $t("button.update") }}
                    <v-progress-circular
                        v-if="updateLoading"
                        indeterminate
                        color="primary"
                        :size="15"
                    ></v-progress-circular>
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
        id: null
    },
    data() {
        return {
            formData: {},
            errors: {},
            fetchLoading: false,
            updateLoading: false,
            roles: roles
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
                id: self.$props.id
            };
            this.$store
                .dispatch("user/permission/get", data)
                .then(response => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    // console.log(response.data.data);
                    self.fetchLoading = false;
                })
                .catch(error => {
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
                id: self.$props.id
            };
            this.$store
                .dispatch("user/permission/update", data)
                .then(response => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.errors = {};
                    self.updateLoading = false;
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.updateLoading = false;
                });
        }
    }
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
