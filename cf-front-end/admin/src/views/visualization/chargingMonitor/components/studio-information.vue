<template>
  <a-card class="general-card" :title="$t('monitor.title.studioInfo')">
    <a-form :model="{}" layout="vertical">
      <a-form-item :label="$t('chargingMonitor.studioPreview.maxAmpere')" required>
        <a-input
          :placeholder="`${$t(
            'monitor.studioInfo.placeholder.studioTitle'
          )}`"
        />
      </a-form-item>
      <a-form-item :label="$t('chargingMonitor.studioPreview.maxVolt')" required>
        <a-input
            :placeholder="`${$t(
            'monitor.studioInfo.placeholder.studioTitle'
          )}`"
        />
      </a-form-item>
      <a-form-item :label="$t('chargingMonitor.studioPreview.maxKWH')" required>
        <a-input
            :placeholder="`${$t(
            'monitor.studioInfo.placeholder.studioTitle'
          )}`"
        />
      </a-form-item>
      <a-form-item :label="$t('chargingMonitor.studioPreview.heartbeat')" required>
        <a-input
            :placeholder="`${$t(
            'monitor.studioInfo.placeholder.studioTitle'
          )}`"
        />
      </a-form-item>
    </a-form>
    <a-button type="primary">{{ $t('monitor.studioInfo.btn.fresh') }}</a-button>
  </a-card>
</template>

<script lang="ts" setup>
</script>
