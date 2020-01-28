<template>
  <div id="address" class="card">
    <span class="help is-info"  v-if="isLoading">Loading...</span>
    <div class="card-body" v-else>
          <WohnungFrom  />
            <table class="table" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Einzugsdatum</th>
                        <th>Strasse</th>
                        <th>Plz</th>
                        <th>Ort</th>
                        <th>Land</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="wohnung in wohnungen_data">
                        <tr v-bind:key="wohnung.id">
                            <td>{{ wohnung.id }}</td>
                            <td>{{ wohnung.einzugsdatum | moment("DD/MM/YYYY") }}</td>
                            <td>{{ wohnung.strasse }}</td>
                            <td>{{ wohnung.plz }}</td>
                            <td>{{ wohnung.ort }}</td>
                            <td>{{ wohnung.land }}</td>
                            <td>{{ wohnung.email }}</td>
                            <td> <router-link :to="{ name: 'User', params: { token:wohnung.token} }">Edit</router-link> </td>
                        </tr>
                    </template>
                </tbody>
            </table>


            <b-container class="bv-example-row">
              <b-row class="justify-content-md-center">
                <b-col cols="12" md="auto">
                  <div class="overflow-auto">
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="rows"
                          :per-page="perPage"
                          first-number
                        ></b-pagination>
                 </div>
                </b-col>
              </b-row>
            </b-container>
	</div>

  </div>
</template>

<script>

import axios from 'axios'
import WohnungFrom from './Forms/WohnungForm.vue'
import { apiHost } from '../config/apiHost.js'

export default {
  name: 'HelloWorld',
  components: {
    WohnungFrom
  },
  props: {
    msg: String
  },
  data() {
        return {
            wohnungen_data: {},
            wohnungen_meta: {},
            isLoading: true,
            rows: 100,
            perPage: 10,
            currentPage: 1
        }
    },
    async created () {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
        this.getWohnungen()
    },
    computed: {
    },
    watch: {
      currentPage: function (val) {
        // this.isLoading = true
        let pagination='?page='+val
        this.getWohnungen(pagination)
      }
    },
    methods:{
      async getWohnungen(pagination=''){
          try {
              const response = await axios.get(apiHost+'wohnungs'+pagination)
              if( response.data ){
                this.wohnungen_data = response.data.data
                this.rows = response.data.meta.totalCount
                this.perPage = response.data.meta.numItemsPerPage
                this.currentPage = response.data.meta.current
                // window.console.log(response.data.meta)
              }

              this.isLoading = false
          } catch(e) {
              // handle authentication error here
          }
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
