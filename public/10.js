(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/User.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/User.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components */ "./resources/js/components/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "User",
  components: {
    Dialog: _components__WEBPACK_IMPORTED_MODULE_1__["Dialog"]
  },
  props: {},
  data: function data() {
    return {
      searchText: null,
      alert: {
        show: false,
        color: "",
        message: ""
      },
      page: 1,
      serverItemsLength: 0,
      pageCount: 0,
      items: [],
      loading: false,
      options: {},
      sortBy: "created_at",
      sortDesc: false,
      disableItemsPerPage: false,
      disablePagination: false,
      headers: [{
        text: "#ID",
        value: "id"
      }, {
        text: "Email",
        value: "email"
      }, {
        text: "Phone",
        value: "phone"
      }, {
        text: "Role",
        value: "role"
      }, {
        text: "Created at",
        value: "created_at"
      }, {
        text: "Updated at",
        value: "updated_at"
      }, {
        text: "Actions",
        value: "actions"
      }],
      snackbar: {
        show: false,
        text: ""
      }
    };
  },
  watch: {
    options: {
      handler: function handler() {
        this.fetch();
      }
    },
    loading: function loading() {
      this.disableItemsPerPage = this.loading;
      this.disablePagination = this.loading;
    }
  },
  methods: {
    fetch: function fetch() {
      var self = this;
      self.loading = true;
      var _self$options = self.options,
          page = _self$options.page,
          itemsPerPage = _self$options.itemsPerPage,
          sortBy = _self$options.sortBy,
          sortDesc = _self$options.sortDesc;
      var data = {
        page: page,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: sortDesc,
        search: self.searchText
      };
      this.$store.dispatch("user/get", data).then(function (response) {
        self.items = response.data.data;
        self.serverItemsLength = response.data.total;
        self.pageCount = response.data.last_page;
        self.loading = false;
      })["catch"](function (error) {
        self.loading = false;
      });
    },
    search: function search() {
      this.fetch();
    },
    add: function add() {
      this.$router.push({
        name: "CreateUser"
      });
    },
    download: function download() {
      var self = this;
      self.loading = true;
      var _self$options2 = self.options,
          page = _self$options2.page,
          itemsPerPage = _self$options2.itemsPerPage,
          sortBy = _self$options2.sortBy,
          sortDesc = _self$options2.sortDesc;
      var data = {
        page: page,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: sortDesc,
        search: self.searchText
      };
      this.$store.dispatch("user/export", data).then(function (response) {
        self.loading = false;
      })["catch"](function (error) {
        self.loading = false;
      });
    },
    reload: function reload() {
      this.fetch();
    },
    click: function click(id, type) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var self;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = type;
                _context.next = _context.t0 === "RouterPush" ? 3 : _context.t0 === "Delete" ? 5 : 11;
                break;

              case 3:
                _this.$router.push({
                  name: "UserDetails",
                  params: {
                    id: id
                  }
                });

                return _context.abrupt("break", 11);

              case 5:
                _context.next = 7;
                return _this.$refs.dialog.open("Confirm", "Are you sure you want to delete this record?");

              case 7:
                if (!_context.sent) {
                  _context.next = 10;
                  break;
                }

                self = _this;

                _this.$store.dispatch("user/delete", {
                  id: id
                }).then(function (response) {
                  self.loading = false;
                  self.fetch();
                })["catch"](function (error) {
                  self.loading = false;
                });

              case 10:
                return _context.abrupt("break", 11);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/User.vue?vue&type=template&id=3a07b5d4&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/User.vue?vue&type=template&id=3a07b5d4& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("Dialog", { ref: "dialog" }),
      _vm._v(" "),
      _c(
        "CRow",
        { staticClass: "p-2" },
        [
          _c(
            "CCol",
            { attrs: { md: "9", sm: "9" } },
            [
              _c("CInput", {
                attrs: { size: "sm" },
                on: {
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.search($event)
                  }
                },
                scopedSlots: _vm._u([
                  {
                    key: "prepend",
                    fn: function() {
                      return [
                        _c(
                          "CButton",
                          {
                            attrs: { color: "primary", size: "sm" },
                            on: { click: _vm.search }
                          },
                          [
                            _c("CIcon", {
                              attrs: {
                                name: "cil-magnifying-glass",
                                size: "sm"
                              }
                            })
                          ],
                          1
                        )
                      ]
                    },
                    proxy: true
                  }
                ]),
                model: {
                  value: _vm.searchText,
                  callback: function($$v) {
                    _vm.searchText = $$v
                  },
                  expression: "searchText"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "CCol",
            { staticClass: "text-right", attrs: { md: "3", sm: "3" } },
            [
              _c(
                "CButton",
                {
                  attrs: { color: "primary", size: "sm" },
                  on: { click: _vm.add }
                },
                [_c("CIcon", { attrs: { name: "cil-plus", size: "sm" } })],
                1
              ),
              _vm._v(" "),
              _c(
                "CButton",
                {
                  attrs: { color: "primary", size: "sm" },
                  on: { click: _vm.download }
                },
                [
                  _c("CIcon", {
                    attrs: { name: "cil-cloud-download", size: "sm" }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "CButton",
                {
                  attrs: { color: "primary", size: "sm" },
                  on: { click: _vm.reload }
                },
                [_c("CIcon", { attrs: { name: "cil-reload", size: "sm" } })],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-data-table", {
        staticClass: "elevation-1",
        attrs: {
          page: _vm.page,
          pageCount: _vm.pageCount,
          headers: _vm.headers,
          items: _vm.items,
          options: _vm.options,
          "server-items-length": _vm.serverItemsLength,
          loading: _vm.loading,
          "sort-by": _vm.sortBy,
          "sort-desc": _vm.sortDesc,
          "footer-props": {
            disableItemsPerPage: _vm.disableItemsPerPage,
            disablePagination: _vm.disablePagination,
            showFirstLastPage: true,
            showCurrentPage: true,
            itemsPerPageOptions: [10, 20, 50, 100]
          }
        },
        on: {
          "update:options": function($event) {
            _vm.options = $event
          },
          "update:sortBy": function($event) {
            _vm.sortBy = $event
          },
          "update:sort-by": function($event) {
            _vm.sortBy = $event
          },
          "update:sortDesc": function($event) {
            _vm.sortDesc = $event
          },
          "update:sort-desc": function($event) {
            _vm.sortDesc = $event
          }
        },
        scopedSlots: _vm._u(
          [
            {
              key: "item.created_at",
              fn: function(ref) {
                var item = ref.item
                return [
                  _vm._v(
                    "\n            " +
                      _vm._s(
                        _vm._f("moment")(item.created_at, "dddd, Do MMMM YYYY")
                      ) +
                      "\n        "
                  )
                ]
              }
            },
            {
              key: "item.updated_at",
              fn: function(ref) {
                var item = ref.item
                return [
                  _vm._v(
                    "\n            " +
                      _vm._s(
                        _vm._f("moment")(item.updated_at, "dddd, Do MMMM YYYY")
                      ) +
                      "\n        "
                  )
                ]
              }
            },
            {
              key: "item.actions",
              fn: function(ref) {
                var item = ref.item
                return [
                  _c(
                    "CButtonGroup",
                    _vm._l(item.actions, function(action) {
                      return _c(
                        "CButton",
                        {
                          key: action.key,
                          attrs: {
                            color: action.color,
                            disabled: action.disabled,
                            size: "sm"
                          },
                          on: {
                            click: function($event) {
                              return _vm.click(item.id, action.type)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                    " +
                              _vm._s(action.title) +
                              "\n                "
                          )
                        ]
                      )
                    }),
                    1
                  )
                ]
              }
            }
          ],
          null,
          true
        )
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/user/User.vue":
/*!******************************************!*\
  !*** ./resources/js/pages/user/User.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _User_vue_vue_type_template_id_3a07b5d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User.vue?vue&type=template&id=3a07b5d4& */ "./resources/js/pages/user/User.vue?vue&type=template&id=3a07b5d4&");
/* harmony import */ var _User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./User.vue?vue&type=script&lang=js& */ "./resources/js/pages/user/User.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _User_vue_vue_type_template_id_3a07b5d4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _User_vue_vue_type_template_id_3a07b5d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/user/User.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/user/User.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/user/User.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./User.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/User.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/user/User.vue?vue&type=template&id=3a07b5d4&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/user/User.vue?vue&type=template&id=3a07b5d4& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_template_id_3a07b5d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./User.vue?vue&type=template&id=3a07b5d4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/User.vue?vue&type=template&id=3a07b5d4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_template_id_3a07b5d4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_User_vue_vue_type_template_id_3a07b5d4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);