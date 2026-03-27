import Vue from "vue";
import VueMoment from "vue-moment";

Vue.use(VueMoment);

Vue.mixin({
    methods: {
        formatDate(value, format) {
            if (!value) {
                return "";
            }

            const dateFormat =
                format || this.$momentDateFormat || "dddd, Do MMMM YYYY";
            return this.$moment(value).format(dateFormat);
        },
    },
});
