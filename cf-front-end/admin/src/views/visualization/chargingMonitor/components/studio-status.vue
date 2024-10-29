<template>
  <a-card
    class="general-card"
    :title="$t('chargingMonitor.studioStatus.title.gunStatus')"
  >
    <template #extra>
      <a-tag color="green">充电中</a-tag>
    </template>
    <a-descriptions layout="horizontal" :data="dataStatus" :column="2">
      <template #label="{ label }">
        <span
          v-if="['mainstream', 'hotStandby', 'coldStandby'].includes(label)"
        >
          {{ $t(`monitor.studioStatus.${label}`) }}
        </span>
        <span v-else>{{ label }}</span>
      </template>
    </a-descriptions>
    <a-typography-title style="margin-bottom: 16px" :heading="6">
      {{ $t('monitor.studioStatus.title.pictureInfo') }}
    </a-typography-title>
    <a-descriptions layout="horizontal" :data="dataPicture" :column="2" />
  </a-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const dataStatus = computed(() => [
    {
      label: t('monitor.studioStatus.frameRate'),
      value: '98 A',
    },
    {
      label: t('monitor.studioStatus.bitRate'),
      value: '1100V',
    },
    {
      label: t('monitor.studioStatus.mainstream'),
      value: '107.8 KW',
    },
    {
      label: t('monitor.studioStatus.hotStandby'),
      value: '60 ℃',
    },
    {
      label: 'coldStandby',
      value: '36.4 度',
    },
    {
      label: t('chargingMonitor.studioPreview.duration'),
      value: '27 分钟',
    },
  ]);
  const dataPicture = computed(() => [
    {
      label: t('monitor.studioStatus.line'),
      value: '120KW',
    },
    {
      label: t('chargingMonitor.studioPreview.protocol'),
      value: '云快充',
    },
    {
      label: t('chargingMonitor.studioPreview.gunNo'),
      value: '1',
    },
    {
      label: t('monitor.studioStatus.pictureQuality'),
      value: '直流',
    },
  ]);
</script>

<style scoped lang="less">
  :deep(.arco-descriptions-item-label) {
    padding-right: 6px;
  }
</style>
