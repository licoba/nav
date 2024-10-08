// @ts-nocheck
// 开源项目MIT，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息，允许商业途径。
// Copyright @ 2018-present xiejiahe. All rights reserved. MIT license.
// See https://github.com/xjh22222228/nav

import { Component } from '@angular/core'
import { $t } from 'src/locale'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { NzMessageService } from 'ng-zorro-antd/message'
import { parseBookmark } from 'src/utils/bookmark'
import { INavProps, IWebProps } from 'src/types'
import { websiteList } from 'src/store'
import { bookmarksExport, getIconBase64 } from 'src/api'
import { saveAs } from 'file-saver'
import { getAuthCode } from 'src/utils/user'
import LZString from 'lz-string'

@Component({
  selector: 'system-bookmark-export',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export default class SystemBookmarkExportComponent {
  $t = $t
  submitting = false
  websiteList: INavProps[] = websiteList
  isExportIcon = false
  seconds = 0
  currentNumber = 0
  countAll = 0

  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {}

  loadImage(url: string) {
    return new Promise((resolve) => {
      if (!url) {
        return resolve(null)
      }
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function () {
        resolve(null)
      }
      img.src = url
    })
  }

  async imageToBase64(item: IWebProps, isGet: boolean = true) {
    const img = await this.loadImage(item.icon)
    if (img) {
      try {
        const size = 32
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, size, size)
        const dataURL = canvas.toDataURL()
        item.icon = dataURL
        return dataURL
      } catch {}
    } else {
      if (!isGet) {
        return
      }
      try {
        if (!item.icon) {
          return
        }
        const res = await getIconBase64({ url: item.icon })
        if (res.data.base64) {
          item.icon = res.data.base64
          await this.imageToBase64(item, false)
        }
      } catch (e: any) {
        const pre = document.getElementById('error-msg')
        if (pre) {
          const html = `
          <a href="${item.icon}" target="_blank">${item.name} ${item.icon}</a>
          <div>${e.response?.data?.message || e.message}</div>
        `
          pre.innerHTML = html + pre.innerHTML
        }
      }
    }
  }

  // 自己定义的导出函数
  async myBookmarksExport({ data }) {
    return new Promise((resolve, reject) => {
      try {
        const jsonData = JSON.parse(data)

        function createBookmarkHTML(item) {
          let html = ''
          const title = item.title || item.name || '未知'
          const icon = item.icon ? ` ICON="${item.icon}"` : ''

          if (item.url) {
            html += `<DT><A HREF="${item.url}" ADD_DATE="${
              new Date(item.createdAt).getTime() / 1000
            }"${icon}>${title}</A>\n`
          } else {
            html += `<DT><H3 ADD_DATE="${
              new Date(item.createdAt).getTime() / 1000
            }">${title}</H3>\n`
            if (item.nav && item.nav.length > 0) {
              html += `<DL><p>\n`
              item.nav.forEach((subItem) => {
                html += createBookmarkHTML(subItem)
              })
              html += `</DL><p>\n`
            }
          }
          return html
        }

        let bookmarksHTML = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n'
        bookmarksHTML +=
          '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n'
        bookmarksHTML += '<TITLE>Bookmarks</TITLE>\n'
        bookmarksHTML += '<H1>Bookmarks</H1>\n'
        bookmarksHTML += '<DL><p>\n'

        jsonData.forEach((item) => {
          bookmarksHTML += createBookmarkHTML(item)
        })

        bookmarksHTML += '</DL><p>\n'

        resolve({ data: { data: bookmarksHTML } })
      } catch (error) {
        reject(error)
      }
    })
  }

  async bookmarksExport() {
    if (this.submitting) {
      return
    }
    const that = this
    this.seconds = 0
    this.countAll = 0
    this.currentNumber = 0
    this.submitting = true
    const interval = setInterval(() => {
      this.seconds += 1
    }, 1000)

    const webs: INavProps = JSON.parse(JSON.stringify(this.websiteList))
    const promiseItems = []

    console.log('所有书签：' + JSON.stringify(webs))
    this.myBookmarksExport({ data: JSON.stringify(webs) })
      .then((res) => {
        const fileName = '发现导航书签.html'
        const blob = new Blob([res.data.data], {
          type: 'text/html;charset=utf-8',
        })
        saveAs(blob, fileName)
        this.notification.success('导出成功', fileName, {
          nzDuration: 0,
        })
      })
      .catch((error) => {
        this.notification.error('导出失败', error)
        console.error('导出失败', error)
      })
      .finally(() => {
        this.submitting = false
        clearInterval(interval)
      })

    // bookmarksExport({ data: LZString.compress(JSON.stringify(webs)) })
    //   .then((res) => {
    //     const fileName = '发现导航书签.html'
    //     const blob = new Blob([res.data.data], {
    //       type: 'text/html;charset=utf-8',
    //     })
    //     saveAs(blob, fileName)
    //     this.notification.success('导出成功', fileName, {
    //       nzDuration: 0,
    //     })
    //   })
    //   .finally(() => {
    //     this.submitting = false
    //     clearInterval(interval)
    //   })
  }
}
