import Vue from 'vue'
import ToastTpl from './Toast.vue'

const ToastConstructor = Vue.extend(ToastTpl)

const Toast = (options = {}) => {
  const instance = new ToastConstructor({
    el: document.createElement('div')
  })

  document.body.appendChild(instance.$el)

  for (const key in options) {
    if (key in instance) {
      instance[key] = options[key]
    }
  }

  Vue.nextTick(() => {
    instance.timer = setTimeout(() => {
      instance.close()
    }, instance.time)
  })
}

export default Toast
