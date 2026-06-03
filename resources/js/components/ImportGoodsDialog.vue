<template>
    <CModal
        :show.sync="dialog"
        :title="$t('chooseinportmode')"
        :centered="true"
    >
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <div
            class="dropzone mt-3"
            :class="{
                'dropzone--active': isDragging,
                'dropzone--disabled': loading,
            }"
            @click="triggerFilePicker"
            @dragenter.prevent="onDragEnter"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
        >
            <CIcon name="cil-cloud-upload"></CIcon>
            <div class="d-flex">
                <div class="dropzone__title">
                    {{ $t("import.msg.dropfile") }}
                </div>
                <div class="dropzone__hint">
                    {{ $t("import.msg.clickupload") }}
                </div>
            </div>
        </div>
        <span v-if="fileName" class="mt-2 d-block">{{ fileName }}</span>
        <input
            ref="fileInput"
            type="file"
            accept=".csv,text/csv"
            style="display: none"
            @change="onFileSelected"
        />
        <template #footer>
            <div class="d-flex">
                <CButton
                    color="warning"
                    size="sm"
                    :disabled="loading"
                    @click="selectModeAndFile('replace')"
                >
                    <CIcon name="cil-trash" class="mr-2"></CIcon>
                    {{ $t("button.eraseandimport") }}
                </CButton>
                <CButton
                    class="ml-2"
                    color="primary"
                    size="sm"
                    :disabled="loading"
                    @click="selectModeAndFile('append')"
                >
                    <CIcon name="cil-plus" class="mr-2"></CIcon>
                    {{ $t("button.appendimport") }}
                </CButton>
            </div>
        </template>
    </CModal>
</template>

<script>
export default {
    name: "ImportGoodsDialog",
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            loading: false,
            fileName: null,
            currentMode: null,
            selectedFile: null,
            isDragging: false,
        };
    },
    watch: {
        dialog(value) {
            if (!value) {
                // Ensure caller promise is not left pending when modal closes via backdrop/ESC.
                if (this.resolve) {
                    this.resolve(null);
                }
                this.resolve = null;
                this.reject = null;
                this.currentMode = null;
                this.fileName = null;
                this.selectedFile = null;
                this.isDragging = false;
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = null;
                }
            }
        },
    },
    methods: {
        open() {
            return new Promise((resolve, reject) => {
                this.currentMode = null;
                this.fileName = null;
                this.selectedFile = null;
                this.resolve = resolve;
                this.reject = reject;
                this.dialog = true;
            });
        },
        selectModeAndFile(mode) {
            this.currentMode = mode;
            if (!this.selectedFile) {
                this.$refs.fileInput?.click();
                return;
            }
            this.confirm();
        },
        onFileSelected(event) {
            const selectedFile = event.target.files?.[0];
            this.setSelectedFile(selectedFile);
        },
        triggerFilePicker() {
            if (this.loading) {
                return;
            }
            this.$refs.fileInput?.click();
        },
        onDragEnter() {
            if (this.loading) {
                return;
            }
            this.isDragging = true;
        },
        onDragOver() {
            if (this.loading) {
                return;
            }
            this.isDragging = true;
        },
        onDragLeave(event) {
            if (event.currentTarget === event.target) {
                this.isDragging = false;
            }
        },
        onDrop(event) {
            this.isDragging = false;
            if (this.loading) {
                return;
            }
            const droppedFile = event.dataTransfer?.files?.[0];
            this.setSelectedFile(droppedFile);
        },
        setSelectedFile(file) {
            if (!file) {
                return;
            }
            const isCsv = /\.csv$/i.test(file.name || "");
            if (!isCsv) {
                return;
            }
            this.fileName = file.name;
            this.selectedFile = file;
            this.loading = false;
        },
        confirm() {
            if (this.selectedFile && this.currentMode && this.resolve) {
                this.resolve({
                    file: this.selectedFile,
                    mode: this.currentMode,
                });
            }
            this.dialog = false;
        },
    },
};
</script>

<style scoped>
.dropzone {
    border: 1px dashed #7d868f;
    border-radius: 8px;
    min-height: 124px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
    text-align: center;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

.dropzone--active {
    border-color: #2eb85c;
    background: rgba(46, 184, 92, 0.08);
}

.dropzone--disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.dropzone__title {
    font-weight: 600;
}

.dropzone__hint {
    font-size: 12px;
    color: #768192;
}

.dropzone__mode {
    font-size: 12px;
    color: #e55353;
    margin-top: 8px;
}
</style>
