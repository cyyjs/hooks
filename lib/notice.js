const Fetch = require('node-fetch')
const noticeUrl = process.env.NOTICE_URL // 通知地址
console.log('noticeUrl:', noticeUrl)
// 匹配通知来源类型
const TYPE_MAP = {
  ALI_FLOW: 'ali_flow' // 阿里云flow
}
// 通知声音
const SOUND_TYPE = {
  SUCCESS: 'birdsong', // 成功
  OTHER: 'calypso' // 其他
}

const getNoticeUrl = (body, type) => {
  if (type === TYPE_MAP.ALI_FLOW) {
    const task = body.task ?? {}
    const {taskName, statusName, pipelineUrl, message, statusCode} = task
    const sound = statusCode === 'SUCCESS' ? SOUND_TYPE.SUCCESS : SOUND_TYPE.OTHER
    const title = taskName + statusName
    return encodeURI(`${noticeUrl}/${title}/${message}?copy=${pipelineUrl}&sound=${sound}`)
  }
  return encodeURI(`${noticeUrl}/未匹配到通知类型`)
}

module.exports = async function(req, res) {
  const type = req.params.type
  const url = getNoticeUrl(req.body, type)
  try {
    await Fetch(url)
    res.end('send success')
  } catch(e) {
    res.end('send fail:' + e.message)
  }
}
