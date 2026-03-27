<template>
    <div>
        <form>
            <v-text-field
                v-model="oldPassword"
                :label="$t('oldpassword')"
                type="password"
                :error="errors.old_password ? true : false"
                :error-messages="errors.old_password"
                required
                outlined
                dense
            ></v-text-field>
            <v-text-field
                v-model="newPassword"
                :label="$t('newpassword')"
                :error="errors.new_password ? true : false"
                :error-messages="errors.new_password"
                type="password"
                required
                outlined
                dense
            ></v-text-field>
            <v-text-field
                v-model="confirmPassword"
                :label="$t('confirmpassword')"
                :error="errors.confirm_password ? true : false"
                :error-messages="errors.confirm_password"
                type="password"
                required
                outlined
                dense
            ></v-text-field>
            <CButton @click="update" color="primary" class="px-4">
                {{ $t("button.update") }}
                <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
                    :size="15"
                ></v-progress-circular>
            </CButton>
        </form>
    </div>
</template>
<script>
//
export default {
    name: "PasswordForm",
    data() {
        return {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            errors: {},
            loading: false
        };
    },
    watch: {},
    methods: {
        update() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                old_password: self.oldPassword,
                new_password: self.newPassword,
                confirm_password: self.confirmPassword
            };
            this.$store
                .dispatch("profile/password/update", data)
                .then(response => {
                    self.oldPassword = "";
                    self.newPassword = "";
                    self.confirmPassword = "";
                    self.errors = {};
                    self.loading = false;
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
.v-text-field :deep(input) {
    font-size: 0.8em;
    font-weight: 100;
}
.v-text-field :deep(label) {
    font-size: 0.8em;
}
.v-text-field :deep(button) {
    font-size: 0.8em;
}
</style>
