const isArrayLike = (obj) => {
  const jtype = (obj) => {
    let class2type = {}
    let toString = class2type.toString
    if (obj == null) {
      return obj + ''
    }
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object' : typeof obj
  }
  const isWindow = (obj) => {
    return obj != null && obj === obj.window
  }
  let length = !!obj && 'length' in obj && obj.length
  let type = jtype(obj)
  if (type === 'function' || isWindow(obj)) {
    return false
  }
  return type === 'array' || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj
}

const range = (obj, callback) => {
  let length = 0
  let i = 0
  if (isArrayLike(obj)) {
    length = obj.length
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  }
  return obj
}

const updateHtmlAttributes = (attributes) => {
  const htmlTags = document.getElementsByTagName('html')
  if (htmlTags.length > 0) {
    range(attributes, (k, v) => {
      htmlTags[0].setAttribute(k, v)
    })
  }
}

const updateBase = (attributes) => {
  const headElement = document.head || document.querySelector('head')
  const oldBases = headElement.getElementsByTagName('base')
  const newBase = document.createElement('base')
  range(oldBases, () => {
    headElement.removeChild(oldBases[0])
  })
  range(attributes, (k, v) => {
    newBase.setAttribute(k, v)
  })
  headElement.appendChild(newBase)
}

const updateMeta = (attributes) => {
  const headElement = document.head || document.querySelector('head')
  const oldMetas = headElement.getElementsByTagName('meta')
  const attributeKeys = Object.keys(attributes)
  let i = 0
  range(oldMetas, () => {
    if (attributeKeys.indexOf(oldMetas[i].name) > -1) {
      headElement.removeChild(oldMetas[i])
    } else i++
  })
  range(attributes, (k, v) => {
    const newElement = document.createElement('meta')
    newElement.setAttribute('name', k)
    newElement.setAttribute('content', v)
    headElement.appendChild(newElement)
  })
}

const updateLink = (links) => {
  const headElement = document.head || document.querySelector('head')
  const oldLinks = headElement.getElementsByTagName('link')
  range(links, (i, link) => {
    const newElement = document.createElement('link')
    range(link, (k, v) => {
      newElement.setAttribute(k, v)
    })
    range(oldLinks, (index) => {
      if (oldLinks[index].isEqualNode(newElement)) {
        headElement.removeChild(oldLinks[index])
      }
    })
    headElement.appendChild(newElement)
  })
}

const updateScript = (scripts) => {
  const headElement = document.head || document.querySelector('head')
  const oldScripts = headElement.getElementsByTagName('script')
  range(scripts, (i, script) => {
    const newElement = document.createElement('script')
    range(script, (k, v) => {
      newElement.setAttribute(k, v)
    })
    range(oldScripts, (index) => {
      if (oldScripts[index].isEqualNode(newElement)) {
        headElement.removeChild(oldScripts[index])
      }
    })
    headElement.appendChild(newElement)
  })
}

const flush = () => {
  const htmlTags = document.getElementsByTagName('html')
  if (htmlTags.length > 0) {
    const bodies = htmlTags[0].getElementsByTagName('body')
    range(bodies, (i, body) => {
      if (i + 1 < bodies.length && body.childElementCount === 0) {
        htmlTags[0].removeChild(body)
      }
    })
  }
}

const doRender = (callback) => {
  callback.call()
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('iphone') > -1 && ua.indexOf('micromessenger') > -1) {
    setTimeout(() => {
      callback.call()
      const iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.src = '/favicon.ico'
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }, 0)
  }
}

export default {
  props: {
    htmlAttributes: {
      type: Object,
    },
    title: {
      type: String,
    },
    base: {
      type: Object,
    },
    meta: {
      type: Object,
    },
    links: {
      type: Array,
    },
    scripts: {
      type: Array,
    },
  },
  data: () => ({
    head: document.head.outerHTML,
  }),
  ready() {
    doRender(() => {
      if (this.htmlAttributes) updateHtmlAttributes(this.htmlAttributes)
      if (this.title) document.title = this.title
      if (this.base) updateBase(this.base)
      if (this.meta) updateMeta(this.meta)
      if (this.links) updateLink(this.links)
      if (this.scripts) updateScript(this.scripts)
      flush()
    })
  },
  beforeDestroy() {
    doRender(() => {
      document.head.outerHTML = this.head
      flush()
    })
  },
}
