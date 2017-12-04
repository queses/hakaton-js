<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <widget headerText="Отзывы жителей">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>Клиент</td>
                <td>Дом</td>
                <td>Отзыв</td>
                <td align="right">Дата</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="resp of responses" :key="resp.id">
                  <td>{{ resp.user.fName }} {{ resp.user.lName }}</td>
                  <td>{{ resp.house.street }} {{ resp.houseNum }}</td>
                  <td>{{ resp.text }}</td>
                  <td align="right">02.11.2017</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </widget>
      </div>
    </div>
  </div>
</template>

<script>
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import axios from '../../services/axios'

  export default {
    components: {
      Widget
    },
    data () {
      return {
        responses: []
      }
    },
    async created () {
      let resp = await axios.get('/response')
      this.responses = resp.data
      console.log(this.responses)
    }
  }
</script>

<style lang="scss">

  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
</style>
