(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/UserDetails.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/UserDetails.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_UserForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/UserForm */ "./resources/js/pages/user/components/UserForm.vue");
/* harmony import */ var _components_BalanceSummary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/BalanceSummary */ "./resources/js/pages/user/components/BalanceSummary.vue");
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
  name: "UserDetails",
  components: {
    UserForm: _components_UserForm__WEBPACK_IMPORTED_MODULE_0__["default"],
    BalanceSummary: _components_BalanceSummary__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      tab: {
        values: ["info", "balance summary"],
        index: 0
      }
    };
  },
  methods: {
    activeTabUpdated: function activeTabUpdated(index) {}
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/BalanceSummary.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/components/BalanceSummary.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "BalanceSummary",
  props: {
    id: null
  },
  mounted: function mounted() {
    this.fetch();
  },
  data: function data() {
    return {
      serverItemsLength: 0,
      items: [],
      loading: false,
      options: {},
      sortBy: "date",
      sortDesc: false,
      disableItemsPerPage: true,
      disablePagination: true,
      headers: [{
        text: "Date",
        value: "date"
      }, {
        text: "Company",
        value: "company.name_tc"
      }, {
        text: "Bank",
        value: "bank_account.bank"
      }, {
        text: "Bank Account Type",
        value: "bank_account.account_type"
      }, {
        text: "Balance",
        value: "balance"
      }, {
        text: "Remark",
        value: "remark"
      }],
      sum: 0,
      dates: [],
      sortedDates: []
    };
  },
  methods: {
    fetch: function fetch() {
      var self = this;
      self.loading = true;
      var sortedDates = [];

      if (self.dates.length > 1) {
        sortedDates = self.dates.sort(function (a, b) {
          return new Date(a) - new Date(b);
        });
      }

      var _self$options = self.options,
          sortBy = _self$options.sortBy,
          sortDesc = _self$options.sortDesc;
      var data = {
        sort_by: sortBy,
        sort_desc: sortDesc,
        user_id: self.$props.id,
        from_date: sortedDates.length > 1 ? sortedDates[0] : null,
        to_date: sortedDates.length > 1 ? sortedDates[1] : null
      };
      this.$store.dispatch("company/bankaccount/balance/summary/get", data).then(function (response) {
        self.items = response.data.data;
        self.serverItemsLength = response.data.total;
        self.sum = response.data.sum;
        self.loading = false;
      })["catch"](function (error) {
        self.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/components/UserForm.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "UserForm",
  props: {
    id: null
  },
  data: function data() {
    return {
      formData: {},
      fetchLoading: false,
      updateLoading: false,
      roles: ["admin", "employee"]
    };
  },
  mounted: function mounted() {
    this.fetch();
  },
  methods: {
    fetch: function fetch() {
      var self = this;
      self.fetchLoading = true;
      var data = {
        id: self.$props.id
      };
      this.$store.dispatch("user/details", data).then(function (response) {
        self.formData = response.data.data;
        self.fetchLoading = false;
      })["catch"](function (error) {
        self.fetchLoading = false;
      });
    },
    update: function update() {
      var self = this;

      if (self.updateLoading) {
        return;
      }

      self.updateLoading = true;

      var data = _objectSpread(_objectSpread({}, self.formData), {}, {
        id: self.$props.id
      });

      this.$store.dispatch("user/update", data).then(function (response) {
        self.formData = response.data.data;
        self.updateLoading = false;
      })["catch"](function (error) {
        self.updateLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.v-text-field[data-v-2ec4c04d] input {\n    font-size: 0.8em;\n    font-weight: 100;\n}\n.v-text-field[data-v-2ec4c04d] label {\n    font-size: 0.8em;\n}\n.v-text-field[data-v-2ec4c04d] button {\n    font-size: 0.8em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/UserDetails.vue?vue&type=template&id=527cbf7c&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/UserDetails.vue?vue&type=template&id=527cbf7c& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    "CRow",
    [
      _c(
        "CCol",
        [
          _c(
            "CCard",
            { staticClass: "p-2" },
            [
              _c(
                "CCardBody",
                [
                  _c(
                    "CTabs",
                    {
                      attrs: { variant: "pills" },
                      on: {
                        "update:activeTab": function(index) {
                          return _vm.activeTabUpdated(index)
                        }
                      }
                    },
                    [
                      _c(
                        "CTab",
                        {
                          attrs: {
                            title: _vm.tab.values[0].toUpperCase(),
                            active: _vm.tab.index === 0 ? true : false
                          }
                        },
                        [
                          _c("hr"),
                          _vm._v(" "),
                          _c("UserForm", {
                            attrs: { id: this.$route.params.id }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "CTab",
                        {
                          attrs: {
                            title: _vm.tab.values[1].toUpperCase(),
                            active: _vm.tab.index === 1 ? true : false
                          }
                        },
                        [
                          _c("hr"),
                          _vm._v(" "),
                          _c("BalanceSummary", {
                            attrs: { id: this.$route.params.id }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/BalanceSummary.vue?vue&type=template&id=6bfa4048&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/components/BalanceSummary.vue?vue&type=template&id=6bfa4048& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    "CRow",
    [
      _c(
        "CCol",
        { attrs: { md: "4", xs: "12" } },
        [
          _c(
            "CRow",
            [
              _c(
                "CCol",
                [
                  _c("v-date-picker", {
                    attrs: { range: "" },
                    model: {
                      value: _vm.dates,
                      callback: function($$v) {
                        _vm.dates = $$v
                      },
                      expression: "dates"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "CRow",
            [
              _c(
                "CCol",
                [
                  _c(
                    "CButton",
                    { attrs: { color: "primary" }, on: { click: _vm.fetch } },
                    [_vm._v("\n                    Update\n                ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "CCol",
        { attrs: { md: "8", xs: "12" } },
        [
          _c(
            "v-data-table",
            {
              staticClass: "elevation-1",
              attrs: {
                headers: _vm.headers,
                items: _vm.items,
                options: _vm.options,
                "server-items-length": _vm.serverItemsLength,
                loading: _vm.loading,
                "sort-by": _vm.sortBy,
                "sort-desc": _vm.sortDesc,
                "hide-default-footer": true,
                "footer-props": {
                  disableItemsPerPage: _vm.disableItemsPerPage,
                  disablePagination: _vm.disablePagination
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
                    key: "item.date",
                    fn: function(ref) {
                      var item = ref.item
                      return [
                        _vm._v(
                          "\n                " +
                            _vm._s(
                              _vm._f("moment")(item.date, "dddd, Do MMMM YYYY")
                            ) +
                            "\n            "
                        )
                      ]
                    }
                  }
                ],
                null,
                true
              )
            },
            [
              _vm._v(" "),
              _c("template", { slot: "body.append" }, [
                _c("tr", [
                  _c("th"),
                  _vm._v(" "),
                  _c("th"),
                  _vm._v(" "),
                  _c("th"),
                  _vm._v(" "),
                  _c("th", [_vm._v("Total:")]),
                  _vm._v(" "),
                  _c("th", [_vm._v(_vm._s(_vm.sum))]),
                  _vm._v(" "),
                  _c("th")
                ])
              ])
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/user/components/UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    "CCard",
    { staticClass: "border-0" },
    [
      _c("v-progress-linear", {
        attrs: { active: _vm.fetchLoading, indeterminate: "", color: "cyan" }
      }),
      _vm._v(" "),
      _c("CCardBody", [
        _c(
          "form",
          [
            _c("v-text-field", {
              attrs: {
                label: "Name",
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              },
              model: {
                value: _vm.formData.name,
                callback: function($$v) {
                  _vm.$set(_vm.formData, "name", $$v)
                },
                expression: "formData.name"
              }
            }),
            _vm._v(" "),
            _c(
              "v-row",
              [
                _c(
                  "c-col",
                  { attrs: { md: "6", sm: "6" } },
                  [
                    _c("v-text-field", {
                      attrs: {
                        label: "Phone",
                        outlined: "",
                        dense: "",
                        clearable: ""
                      },
                      model: {
                        value: _vm.formData.phone,
                        callback: function($$v) {
                          _vm.$set(_vm.formData, "phone", $$v)
                        },
                        expression: "formData.phone"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "c-col",
                  { attrs: { md: "6", sm: "6" } },
                  [
                    _c("v-text-field", {
                      attrs: {
                        label: "Email",
                        required: "",
                        outlined: "",
                        dense: "",
                        clearable: ""
                      },
                      model: {
                        value: _vm.formData.email,
                        callback: function($$v) {
                          _vm.$set(_vm.formData, "email", $$v)
                        },
                        expression: "formData.email"
                      }
                    })
                  ],
                  1
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("v-select", {
              attrs: {
                items: _vm.roles,
                label: "Role",
                required: "",
                outlined: "",
                dense: ""
              },
              model: {
                value: _vm.formData.role,
                callback: function($$v) {
                  _vm.$set(_vm.formData, "role", $$v)
                },
                expression: "formData.role"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              attrs: {
                label: "Updated at",
                outlined: "",
                dense: "",
                disabled: ""
              },
              model: {
                value: _vm.formData.updated_at,
                callback: function($$v) {
                  _vm.$set(_vm.formData, "updated_at", $$v)
                },
                expression: "formData.updated_at"
              }
            }),
            _vm._v(" "),
            _c("v-text-field", {
              attrs: {
                label: "Created at",
                outlined: "",
                dense: "",
                disabled: ""
              },
              model: {
                value: _vm.formData.created_at,
                callback: function($$v) {
                  _vm.$set(_vm.formData, "created_at", $$v)
                },
                expression: "formData.created_at"
              }
            }),
            _vm._v(" "),
            _c(
              "CButton",
              {
                staticClass: "px-4",
                attrs: { color: "primary" },
                on: { click: _vm.update }
              },
              [
                _vm._v("\n                Update\n                "),
                _vm.updateLoading
                  ? _c("v-progress-circular", {
                      attrs: { indeterminate: "", color: "primary", size: 15 }
                    })
                  : _vm._e()
              ],
              1
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/user/UserDetails.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/user/UserDetails.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserDetails_vue_vue_type_template_id_527cbf7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserDetails.vue?vue&type=template&id=527cbf7c& */ "./resources/js/pages/user/UserDetails.vue?vue&type=template&id=527cbf7c&");
/* harmony import */ var _UserDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserDetails.vue?vue&type=script&lang=js& */ "./resources/js/pages/user/UserDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserDetails_vue_vue_type_template_id_527cbf7c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserDetails_vue_vue_type_template_id_527cbf7c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/user/UserDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/user/UserDetails.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/user/UserDetails.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/UserDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/user/UserDetails.vue?vue&type=template&id=527cbf7c&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/user/UserDetails.vue?vue&type=template&id=527cbf7c& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetails_vue_vue_type_template_id_527cbf7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDetails.vue?vue&type=template&id=527cbf7c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/UserDetails.vue?vue&type=template&id=527cbf7c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetails_vue_vue_type_template_id_527cbf7c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetails_vue_vue_type_template_id_527cbf7c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/user/components/BalanceSummary.vue":
/*!***************************************************************!*\
  !*** ./resources/js/pages/user/components/BalanceSummary.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BalanceSummary_vue_vue_type_template_id_6bfa4048___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BalanceSummary.vue?vue&type=template&id=6bfa4048& */ "./resources/js/pages/user/components/BalanceSummary.vue?vue&type=template&id=6bfa4048&");
/* harmony import */ var _BalanceSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BalanceSummary.vue?vue&type=script&lang=js& */ "./resources/js/pages/user/components/BalanceSummary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BalanceSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BalanceSummary_vue_vue_type_template_id_6bfa4048___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BalanceSummary_vue_vue_type_template_id_6bfa4048___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/user/components/BalanceSummary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/user/components/BalanceSummary.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/user/components/BalanceSummary.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BalanceSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BalanceSummary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/BalanceSummary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BalanceSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/user/components/BalanceSummary.vue?vue&type=template&id=6bfa4048&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/user/components/BalanceSummary.vue?vue&type=template&id=6bfa4048& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BalanceSummary_vue_vue_type_template_id_6bfa4048___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BalanceSummary.vue?vue&type=template&id=6bfa4048& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/BalanceSummary.vue?vue&type=template&id=6bfa4048&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BalanceSummary_vue_vue_type_template_id_6bfa4048___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BalanceSummary_vue_vue_type_template_id_6bfa4048___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/pages/user/components/UserForm.vue":
/*!*********************************************************!*\
  !*** ./resources/js/pages/user/components/UserForm.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserForm_vue_vue_type_template_id_2ec4c04d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true& */ "./resources/js/pages/user/components/UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true&");
/* harmony import */ var _UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserForm.vue?vue&type=script&lang=js& */ "./resources/js/pages/user/components/UserForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css& */ "./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserForm_vue_vue_type_template_id_2ec4c04d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserForm_vue_vue_type_template_id_2ec4c04d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2ec4c04d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/user/components/UserForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/user/components/UserForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/pages/user/components/UserForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=style&index=0&id=2ec4c04d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_style_index_0_id_2ec4c04d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/pages/user/components/UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/pages/user/components/UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_template_id_2ec4c04d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/user/components/UserForm.vue?vue&type=template&id=2ec4c04d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_template_id_2ec4c04d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserForm_vue_vue_type_template_id_2ec4c04d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);