<template>
  <div class="login">
    <h2>Добро пожаловать!</h2>
    <form method="post" action="/auth/login" name="login">
      <div class="form-group">
        <div class="input-group">
        <vuestic-simple-select
            label="Выберите управляющую компанию"
            v-model="selectedCompanyTitle"
            v-bind:options="companyTitles">
        </vuestic-simple-select>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required"/>
          <label class="control-label" for="password">Пароль</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" @click.prevent="submit">
          Войти
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VuesticSimpleSelect from '../../../components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
  import axios from '../../../services/axios'

  export default {
    name: 'login',
    components: [
      VuesticSimpleSelect
    ],
    data: () => ({
      selectedCompany: {},
      selectedCompanyTitle: '',
      companyTitles: [],
      companies: []
    }),
    methods: {
      ...mapActions(['setCompanyTitle']),
      submit () {
        console.log('kek')
        this.$router.replace('/events')
        if (this.selectedCompanyTitle) {
          this.setCompanyTitle(this.selectedCompanyTitle)
        }
      }
    },
    async beforeMount () {
      const res = await axios.get('/uk')
      this.companies = res.data
      this.companyTitles = this.companies.map((company) => {
        return company.title.replace('Общество с ограниченной ответственностью', 'ООО')
            .replace('Муниципальное предприятие', 'МУ')
      })
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
