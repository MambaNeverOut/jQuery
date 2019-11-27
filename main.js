// const api = jQuery('.test')
// api.addClass('black')


// const api2 = api.find('.child').addClass('red')
// api.addClass('green')

// const x = jQuery('.test').find('.child')
// x.each((div) =>
//   console.log(div)
// )

// const x = jQuery('.test')
// x.parent().print()



window.jQuery = function (selector) {
  let elements
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector)
  } else if (selector instanceof Array) {
    elements = selector
  }

  return {
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className)
      }
      return this
    },
    find(selector) {
      let array = []
      for (let i = 0; i < elements.length; i++) {
        const elements2 = Array.from(elements[i].querySelectorAll(selector))
        array = array.concat(elements2)
      }
      return jQuery(array)
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this
    }
  }
}

window.$ = window.jQuery

$('#test').find('.child').addClass('red') // 请确保这句话成功执行