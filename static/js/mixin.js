import day from 'dayjs'
import { faceMap } from '../utils/face-map'
import { mapGetters } from 'vuex'
const mixin = {
  data() {
    return {
      pagesize: 12,
      countdownFunc: null,
      smsDisabled: false,
      smsButtonText: '获取短信验证码',
    }
  },
  filters: {
    // 手机号中间四位*
    encryptMobile(mobile) {
      if (!mobile) return '—'

      return mobile.substring(0, 3) + '****' + mobile.substring(7)
    },

    // 内存大小格式转换
    turnByte(byte) {
      let num = (byte / 1024).toFixed(1)
      switch (true) {
        case num < 1:
          return num + 'B'
        case num >= 1 && num < 1024:
          return num + 'KB'
        case num >= 1024 && num < 1024 * 1024:
          return (num / 1024).toFixed(1) + 'MB'
        case num >= 1024 * 1024 && num < 1024 * 1024 * 1024:
          return (num / (1024 * 1024)).toFixed(1) + 'GB'
        case num >= 1024 * 1024 * 1024:
          return (num / (1024 * 1024 * 1024)).toFixed(1) + 'TB'
      }
    },
    /**
     * 格式时间
     * @param {*} timestamp 时间戳
     * @param {*} format 格式
     */
    formatTime(timestamp, format) {
      if (!timestamp) return '—'

      return day(timestamp).format(format || 'YYYY.MM.DD')
    }
  },
  methods: {
    /**
     * 用户头像处理
     * @param {*} url
     */
    getImage(url) {
      if (!url) {
        return require('../assets/index/header.jpg')
      }
      return url
    },

    /**
     * 修复手机拍摄的图片上传阿里云旋转的问题
     * @param {*} url
     */
    orientImage(url) {
      const orient = 'auto-orient,1'
      url =
        `${url}`.indexOf('?x-oss-process=image') > -1
          ? `${url}/${orient}`
          : `${url}?x-oss-process=image/${orient}`

      return url
    },

    /**
     * 阿里云图片thumbnail
     * @param {String} url
     * @param {String} height 不限制高度可以传0
     * @param {String} width 不限制宽度可以传0
     */
    resizeImage(url, height, width) {
      const resize = '/resize,m_mfit'
      if (url.indexOf('?x-oss-process=image/resize') > -1) return
      if (url.indexOf('?x-oss-process=image') > -1) {
        url += resize
      } else {
        url += `?x-oss-process=image${resize}`
      }
      if (height) {
        url += `,h_${height}`
      }
      if (width) {
        url += `,w_${width}`
      }

      return url
    },

    // 验证手机
    validateMobile(mobile) {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile)
    },

    // 短信倒计时
    countdown(timeout) {
      timeout = timeout || 60
      if (this.countdownFunc) {
        clearInterval(this.countdownFunc)
      }

      const newTimeout = timeout
      const buttonText = this.smsButtonText
      const func = setInterval(() => {
        if (timeout <= 1) {
          timeout = newTimeout
          clearInterval(this.countdownFunc)
          this.smsDisabled = false
          this.smsButtonText = buttonText
        } else {
          timeout--
          this.smsDisabled = true
          this.smsButtonText = `${timeout
            .toString()
            .padStart(2, '0')}s 后重新获取`
        }
      }, 1000)

      this.countdownFunc = func
    },

    stopCountdown() {
      if (this.countdownFunc) {
        clearInterval(this.countdownFunc)
        this.smsDisabled = false
        this.smsButtonText = '获取短信验证码'
      }
    },

    /**
     * 解析消息内容表情
     * @param {*} content
     */
    parseContentEmoji(content) {
      if (!content) return ''

      content = content.replace(/\[.+?\]/g, (a, b) => {
        let src = faceMap[a]

        if (!src) return a

        src = require(`../assets/face/${src}`)

        return `<img class="face-img" width="20px" height="20px" style="vertical-align:-5px;" src="${src}" alt="${a}" />`
      })

      return content
    },

    // 验证身份证号
    validateIdCode(idCode) {
      let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      return idCode.length === 18 && p.test(idCode)
    },

    // 验证数字
    validateNumber(num) {
      let p = /^[0-9]*$/
      return p.test(num)
    },

    // 格式化数字（每三位加逗号）
    toThousands(num) {
       num = (num || 0).toString(),
        result = "";
      while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
      return result;
    }
  }
}

export default mixin
