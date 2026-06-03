<template>
    <div v-if="data.length > 0">
        <CCard>
            <!-- <v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear> -->
            <CCardBody>
                <div class="d-flex justify-content-between mb-2">
                    <div class="d-flex">
                        <h4 id="import-status" class="card-title">
                            {{ $t("currentimportstatus") }}
                        </h4>
                        <div class="d-flex align-items-start ml-2">
                            <CBadge color="primary">
                                {{ filteredData.length }}
                            </CBadge>
                        </div>
                    </div>
                    <div class="d-flex">
                        <CButtonGroup>
                            <CButton
                                size="sm"
                                :color="
                                    selectedFilter === 'all'
                                        ? 'primary'
                                        : 'secondary'
                                "
                                :active="selectedFilter === 'all'"
                                @click.prevent="setSelectedFilter('all')"
                            >
                                {{ $t("all") }}
                            </CButton>
                            <CButton
                                size="sm"
                                :color="
                                    selectedFilter === 'completed'
                                        ? 'primary'
                                        : 'secondary'
                                "
                                :active="selectedFilter === 'completed'"
                                @click.prevent="setSelectedFilter('completed')"
                            >
                                {{ $t("import.status.completed") }}
                            </CButton>
                            <CButton
                                size="sm"
                                :color="
                                    selectedFilter === 'processing'
                                        ? 'primary'
                                        : 'secondary'
                                "
                                :active="selectedFilter === 'processing'"
                                @click.prevent="setSelectedFilter('processing')"
                            >
                                {{ $t("import.status.processing") }}
                            </CButton>
                            <CButton
                                size="sm"
                                :color="
                                    selectedFilter === 'failed'
                                        ? 'primary'
                                        : 'secondary'
                                "
                                :active="selectedFilter === 'failed'"
                                @click.prevent="setSelectedFilter('failed')"
                            >
                                {{ $t("import.status.failed") }}
                            </CButton>
                        </CButtonGroup>
                        <CButton
                            color="primary"
                            class="ml-2"
                            size="sm"
                            @click.prevent="fetch"
                            :disabled="loading"
                        >
                            <CIcon name="cil-reload" size="sm" />
                        </CButton>
                    </div>
                </div>
                <div class="d-flex flex-column">
                     
                    <div v-if="filteredData.length > 0">
                        <div
                            v-for="item in filteredData"
                            :key="item.job_id"
                            class="d-flex mb-2"
                        >
                            <div class="d-flex flex-column flex-grow-1">
                                <div class="d-flex mb-2">
                                    <span>{{ item.filename }}</span>
                                    <div class="d-flex align-items-center ml-2">
                                        <CBadge
                                            v-if="item.mode"
                                            class="mr-2"
                                            color="primary"
                                        >
                                            {{ $t(`import.${item.mode}`) }}
                                        </CBadge>
                                        <CBadge
                                            v-if="item.status"
                                            :color="color(item.status)"
                                        >
                                            {{
                                                $t(
                                                    `import.status.${item.status}`
                                                )
                                            }}
                                        </CBadge>
                                    </div>
                                </div>
                                <CProgress
                                    :color="
                                        item.status === 'processing'
                                            ? 'primary'
                                            : color(item.status)
                                    "
                                    variant="striped"
                                    :value="progressValue(item)"
                                >
                                    <CProgressBar>
                                        {{ progressText(item) }}
                                    </CProgressBar>
                                </CProgress>
                            </div>
                            <div class="d-flex align-items-end ml-2">
                                <span class="mr-2">
                                    {{
                                        formatDate(
                                            item.created_at,
                                            "dddd, Do MMMM YYYY HH:mm"
                                        )
                                    }}
                                </span>
                                <CButton
                                    size="sm"
                                    color="danger"
                                    :disabled="
                                        isDeleting ||
                                        ['queued', 'processing'].includes(
                                            item.status
                                        )
                                    "
                                    @click.prevent="remove(item)"
                                >
                                    <CIcon name="cil-trash" size="sm" />
                                </CButton>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <span>{{ $t("import.no_data") }}</span>
                    </div>
                </div>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
export default {
    name: "ImportStatusSection",
    data() {
        return {
            pollTimer: null,
            selectedFilter: "all",
            isDeleting: false,
        };
    },
    computed: {
        loading() {
            return this.$store.state["goods/import/status"]?.loading || false;
        },
        data() {
            return this.$store.state["goods/import/status"]?.data || [];
        },
        filteredData() {
            if (this.selectedFilter === "all") {
                return this.data;
            }
            return this.data.filter(
                (item) => item.status === this.selectedFilter
            );
        },
    },
    mounted() {
        this.fetch();
    },
    beforeDestroy() {
        this.stopPolling();
    },
    methods: {
        async fetch() {
            if (this.loading) {
                return;
            }
            try {
                await this.$store.dispatch("goods/import/status");
                this.updatePolling();
            } catch (error) {
                this.stopPolling();
            }
        },
        progressText(item) {
            const progress = item?.progress || {};
            const percent = Number(progress.percent || 0);
            const rowsProcessed = Number(progress.rows_processed || 0);
            const rowsValid = Number(progress.rows_valid || 0);
            return `${percent}% (${rowsProcessed}/${rowsValid})`;
        },
        progressValue(item) {
            const progress = item?.progress || {};
            const percent = Number(progress.percent);
            if (Number.isFinite(percent)) {
                return Math.max(0, Math.min(100, percent));
            }
            const rowsProcessed = Number(progress.rows_processed || 0);
            const rowsValid = Number(progress.rows_valid || 0);

            if (rowsValid <= 0) {
                return item?.status === "completed" ? 100 : 0;
            }
            const calculated = (rowsProcessed / rowsValid) * 100;
            return Math.max(0, Math.min(100, calculated));
        },
        color(status) {
            switch (status) {
                case "completed":
                    return "success";
                case "processing":
                    return "warning";
                case "failed":
                    return "danger";
                case "queued":
                    return "info";
                default:
                    return "secondary";
            }
        },
        setSelectedFilter(status) {
            this.selectedFilter = status || "all";
        },
        async remove(item) {
            if (!item?.job_id || this.isDeleting) {
                return;
            }
            this.isDeleting = true;
            try {
                await this.$store.dispatch("goods/import/status/delete", {
                    jobId: item.job_id,
                });
                await this.fetch();
            } catch (error) {
                // noop
            } finally {
                this.isDeleting = false;
            }
        },
        hasActiveJobs() {
            return this.data.some((job) =>
                ["queued", "processing"].includes(job.status)
            );
        },
        updatePolling() {
            if (this.hasActiveJobs()) {
                this.startPolling();
                return;
            }
            this.stopPolling();
        },
        startPolling() {
            if (this.pollTimer) {
                return;
            }
            this.pollTimer = setInterval(() => {
                this.fetch();
            }, 5 * 1000);
        },
        stopPolling() {
            if (!this.pollTimer) {
                return;
            }
            clearInterval(this.pollTimer);
            this.pollTimer = null;
        },
    },
};
</script>
