window.$ = window.jQuery = function(selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      // 查找div
      elements = document.querySelectorAll(selectorOrArray);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  // api 可以操作elements
  const api = Object.create(jQuery.prototype); // 创建一个对象，这个对象的_proto_就是括号里面的东西
  // const api = { _proto_: jQuery.prototype };
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
  });
  // 返回操作elements的对象
  return api;
};

jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    return this.elements[index];
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each(el => node.appendChild(el));
    } else if (node.jQuery === true) {
      this.each(el => node.get(0).appendChild(el));
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each(node => this.get(0).appendChild(node));
    }
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this;
    return jQuery(array);
  },
  end() {
    return this.oldApi;
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    let array = [];
    this.each(node => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    let array = [];
    this.each(node => {
      array.push(...node.children);
      // array.push(node.children[0], node.children[1], node.children[2]......)
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  // 闭包：函数访问外部的变量
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this; // 返回对象本身，链式编程
  }
};
