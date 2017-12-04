<template>
  <div class="form-elements">

    <vuestic-alert type="success" v-if="showAlert.success" :withCloseBtn="true">
      <span class="badge badge-pill badge-success">УСПЕХ</span>
      Сообщение отправлено.
      <i class="fa fa-close alert-close" @click="showAlert.success = false"></i>
    </vuestic-alert>
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Новое событие">
          <form>

            <div class="row">
              <div class="col-md-9">
                <fieldset>
                  <div class="form-group with-icon-right" :class="{'has-error': errors.has('eventTitle')}">
                    <div class="input-group">
                      <input
                        id="eventTitle"
                        name="eventTitle"
                        v-model="eventTitle"
                        v-validate="'required'"
                        required/>
                      <i class="fa fa-exclamation-triangle icon-right input-icon" v-show="errors.has('wrongEmail')"></i>
                      <label class="control-label" for="eventTitle">Название события</label><i class="bar"></i>
                      <small v-show="errors.has('eventTitle')" class="help text-danger">Это поле необходимо заполнить
                      </small>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <textarea type="text" id="simple-textarea"
                        v-model="eventDescr"
                      required/>
                      <label class="control-label" for="simple-textarea">Описание события</label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="hotel-date-picker">
                    <HotelDatePicker :i18n="rusCalendar"
                        @checkInChanged="checkChanged('in', $event)" @checkOutChanged="checkChanged('out', $event)"/>
                  </div>
<!--                   <div class="abc-checkbox abc-checkbox-primary">
                    <input id="checkbox2" type="checkbox" checked>
                    <label for="checkbox2">
                      <span class="abc-label-text">Послать во все дома</span>
                    </label>
                  </div>
                  <vuestic-multi-select
                    label="Выберите дом"
                    v-model="multiSelectStreetModel"
                    v-bind:options="streetList">
                  </vuestic-multi-select> -->
                </fieldset>
              </div>

              <div class="col-md-2">
                <fieldset>
                  <div class="btn btn-micro btn-primary" @click.prevent="submit">Отправить</div>
                </fieldset>
              </div>
            </div>

          </form>
        </vuestic-widget>
      </div>
    </div>

  </div>
</template>

<script>
  import VuesticSwitch from '../../../components/vuestic-components/vuestic-switch/VuesticSwitch'
  import VuesticSimpleSelect from '../../../components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
  import VuesticMultiSelect from '../../../components/vuestic-components/vuestic-multi-select/VuesticMultiSelect'
  import StreetList from '../StreetList'
  import axios from '../../../services/axios'
  import HotelDatePicker from 'vue-hotel-datepicker'

  export default {
    name: 'form-elements',
    components: {
      VuesticSwitch,
      VuesticSimpleSelect,
      VuesticMultiSelect,
      HotelDatePicker
    },
    computed: {
      rusCalendar: () => ({
        night: 'дней',
        nights: 'дней',
        'day-names': ['Воскр', 'Пон', 'Втор', 'Среда', 'Четв', 'Пятн', 'Субб'],
        'check-in': 'Дата от',
        'check-out': 'Дата до',
        'month-names': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      })
    },
    data () {
      return {
        eventTitle: '',
        eventDescr: '',
        streetList: StreetList,
        multiSelectStreetModel: [],
        dateRange: {},
        showAlert: { success: false }
      }
    },
    methods: {
      checkChanged (type, date) {
        this.dateRange[type] = date
        console.log(this.dateRange)
      },
      async submit () {
        let validated = await this.$validator.validateAll()
        if (!validated) return
        const reqData = {
          title: this.eventTitle,
          descr: this.eventDescr,
          houses: this.multiSelectStreetModel
        }
        if (this.dateRange && this.dateRange.in && this.dateRange.out) {
          const getDate = (data) => data.getFullYear() + '/' + (data.getMonth() + 1) + '/' + data.getDate()
          reqData.dateFrom = getDate(this.dateRange.in)
          reqData.dateTo = getDate(this.dateRange.out)
        }
        axios.post('/event', { event: reqData }).then((res) => {
          this.showAlert.success = true
        }).catch((res) => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.$validator.validateAll()
    }
  }
</script>

<style lang="scss">
  .abc-checkbox, .abc-radio {
    display: flex !important;
    justify-content: flex-start;
  }

  input[type=checkbox]:disabled + label, input[type=radio]:disabled + label,
  input[type=checkbox]:disabled, input[type=radio]:disabled {
    cursor: not-allowed;
  }

  .hotel-date-picker {
    margin-bottom: 4ex;
  }
</style>
