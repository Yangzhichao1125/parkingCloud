<template>
  <div className="group15 flex-col" style="height: 90vh; width: 95%">
    <div className="bd6 flex-row" style="height: 90vh">
      <div className="box3 flex-row" style="height: 90vh">
        <div
          :style="{
            height: '362px',
            width: '32%',
          }"
          className="group16-0 flex-col"
          v-for="(item) in deviceList"
          :key="item.id"
        >
          <div className="layer5-0 flex-col">
            <span className="word11-0">{{ item.deviceName }}</span>
            <div
              :style="{
                height: '66%',
              }"
              :id="'show_video' + (item.id)"
              className="pic1-0"
            ></div>
            <div className="section4-0 flex-row">
              <div
                className="block1-0 flex-col"
                @click="onVideoIndex(item, 'on')"
              >
                <span className="word12-0">开闸放行</span>
                <div
                  id="videoContainer"
                  style="border: 0; width: 704px; height: 576px"
                ></div>
              </div>

              <div
                className="block2-01 flex-col"
                style="width: 20%"
                @click="onVideoIndex(item, 'snap')"
              >
                <span className="word12-0">抓拍</span>
              </div>

              <div
                className="block2-0 flex-col"
                @click="onVideoIndex(item, 'off')"
              >
                <span className="txt1-0">关闸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import { toRaw } from "vue";
import { getCarparkDeviceAdmin } from "@/network/api";
export default {
  data() {
    return {
      deviceList: [],
      socket: null,
    };
  },

  computed: {
    ...mapState(["parkSwitch", "carParkIndex", "carParkList"]),
  },
  // 获取停车场首次加载时 第一个停车场的所有硬件
  // 监听 所选停车场的 index 当发生改变时 应当重新获取所有硬件
  // 刷新页面作用 --- 重置所有ws
  watch: {
    carParkList() {
      this.getHardwareList();
    },
    carParkIndex() {
      this.getHardwareList();
      window.location.reload();
    },
  },
  mounted() {
    // this.initPlayer();
  },
  methods: {
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script"); // 创建一个新的 <script> 元素
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script); // 把<script>元素添加到头部，这样浏览器就会开始加载并执行脚本
      });
    },
    initPlayer(data) {
      this.loadScript("/Rtsp2WPlayer.min.js").then(() => {
        // 确保 Rtsp2WPlayer 被加载到 window 对象中
        if (window.Rtsp2WPlayer) {
          for (const i in data) {
            let info = data[i];
            let playerUrl = "";
            switch (info.brand){
              case "zhen_shi":
                playerUrl = `rtsp://${info.ip}:8557/h264`;
                break;
              case "hua_xia":
                playerUrl = `rtsp://${info.ip}/stream_main`;
                break;
              case "qian_yi":
                playerUrl = `rtsp://${info.ip}:50000/video`;
                break;
              case "xlut":
                playerUrl = `rtsp://${info.ip}:554/h264ESVideoTest`;
                break;
              case "qianlima":
                playerUrl = `rtsp://${info.ip}:8557/h264`;
                break;
            }
            const player = new window.Rtsp2WPlayer({
              serverPath: "http://127.0.0.1:8083",
              containerId: `show_video${info.id}`,
              logEnabled: true,
              style: {
                controls: true,
              },
              onconnectionstatechange: function (state) {
                console.log("连接状态：", state);
                if (state === "disconnected" || state === "failed") {
                  setTimeout(() => {
                    console.log("重连...");
                    player.play(playerUrl); // 确保调用了正确的 play 方法
                  }, 5000);
                }
              },
            });
            player.play(playerUrl); // 播放视频流
          }

        } else {
          console.error("Rtsp2WPlayer is not loaded.");
        }
      });
    },
    // 图片放大功能
    showBigImage(index) {
      var mainDiv = document.getElementById(`show_video${index}`);
      if (mainDiv.classList.contains("bigImage")) {
        mainDiv.classList.remove("bigImage");
      } else {
        mainDiv.classList.add("bigImage");
      }
    },
    async getHardwareList() {
      var { data, code } = await getCarparkDeviceAdmin({
        areaId: this.carParkList[this.carParkIndex].id,
        deviceType: 2,
        page: 1,
        size: 100,
      });
      console.log(data, 555);
      if (code != 10002) return;
      this.deviceList = data;
      this.getVideo(data);
    },
    getVideo(data) {
        this.initPlayer(data);
    },
  },
};
</script>

<style>
.bigImage {
  width: 90vw;
  height: 90vh;
  position: fixed;
  left: 5vw;
  top: 5vh;
  z-index: 99999;
  transition: all 0.5s;
}
</style>
