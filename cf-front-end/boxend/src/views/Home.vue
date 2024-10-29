<template>
  <div class="home">
    <div className="page flex-col">
      <div className="bd1 flex-col">
        <Header ref="header" />
        <div class="page" :class="{ animating: animating }">
          <div className="layer">
            <!-- 左上 -->
            <div className="flex-row layer3">
              <ParkingLotList />
              <VideoList v-if="!globalConfig.videoFull" />
              <VideoListFull v-if="globalConfig.videoFull" />
            </div>
            <!-- 右上 -->
            <div className="flex-row layer4">
              <ChargeBox
                @countPayAmountByDuty="countPayAmountByDuty"
                v-if="!globalConfig.videoFull"
              />
            </div>
            <!-- 左下 -->
            <div className="flex-row layer5">
              <EntryExitRecords v-if="!globalConfig.videoFull" />
            </div>
            <!-- 右下 -->
            <div className="flex-row layer6">
              <EntryAndExitPicture v-if="!globalConfig.videoFull" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <LicenseplateCorrection />
    <!-- 停车场列表选择开关 -->
    <div class="selectParkingLot" @click="setParkSwitch">选择停车场</div>
  </div>
</template>

<script>
import Header from "../components/Header";
import ParkingLotList from "../components/ParkingLotList";
import LicenseplateCorrection from "../components/LicenseplateCorrection/LicenseplateCorrection";
import VideoList from "../components/VideoList";
import VideoListFull from "../components/VideoList/full";
import ChargeBox from "../components/ChargeBox";
import EntryExitRecords from "../components/EntryExitRecords";
import EntryAndExitPicture from "../components/EntryAndExitPicture";
import { InitWebSocket } from "@/utils/websocket";
import { mapState } from "vuex";
import store from "../store";
export default {
  name: "Home",
  components: {
    Header,
    ParkingLotList,
    VideoList,
    VideoListFull,
    ChargeBox,
    EntryExitRecords,
    EntryAndExitPicture,
    LicenseplateCorrection,
  },
  computed: {
    ...mapState(["parkSwitch", "globalConfig"]),
  },
  data() {
    return {
      animating: false,
    };
  },
  watch: {
    globalConfig: {
      deep: true,
      handler() {
        window.location.reload();
      },
    },
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      InitWebSocket();
    }
    // setInterval(()=>{
    //   location.reload();
    // },10000)
  },
  methods: {
    setParkSwitch() {
      store.commit("SETPARKLISTSWITCH", !this.parkSwitch);
      this.animating = !this.animating;
    },
    countPayAmountByDuty() {
      this.$refs.header.countPayAmountByDuty();
    },
  },
};
</script>
<style scoped>
.selectParkingLot {
  position: absolute;
  width: 30px;
  background: red;
  left: 0;
  top: 110px;
  z-index: 2;
  color: #fff;
  text-align: center;
}
.page {
  transition: left 0.3s ease-in-out;
  position: relative;
  left: 0;
}

.animating {
  left: 200px;
}
</style>
