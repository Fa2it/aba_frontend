<template>
  <div id="address" class="card">
    <p v-if="isEdit"></p>
    <WohnungFrom @updatedWohnungEvent="updateWohnung" v-else    :edit_data="user_edit_data"/>
    <span class="help is-info"  v-if="isLoading">Loading...</span>
    <div class="card-body" v-else>
      <b-button class="mr-2" v-b-modal.modal-Wohnung v-on:click="editWohnung()" variant="secondary">Edit</b-button>
      <b-button variant="danger" @click="showModal">Delete</b-button>
            <table class="table" >
                <tbody>
                  <tr>
                      <th colspan="2">Action</th>
                  </tr>
                    <tr>
                        <th>ID</th>
                        <td>{{ wohnung.id }}</td>
                    </tr>
                    <tr>
                        <th>Einzugsdatum</th>
                        <td>{{ wohnung.einzugsdatum | moment("DD/MM/YYYY") }}</td>
                    </tr>
                    <tr>
                        <th>Strasse</th>
                        <td>{{ wohnung.strasse }}</td>
                    </tr>
                    <tr>
                        <th>Plz</th>
                        <td>{{ wohnung.plz }}</td>
                    </tr>
                    <tr>
                        <th>Ort</th>
                        <td>{{ wohnung.ort }}</td>
                    </tr>
                    <tr>
                        <th>Land</th>
                        <td>{{ wohnung.land }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ wohnung.email}}</td>
                    </tr>
                </tbody>
            </table>
            <b-modal id="modal-delete" hide-footer title="Delete Address">
            <div class="d-block text-center">
              <p class="">Are you sure you want to Delete Item Nr {{ wohnung.id  }}</p>
            </div>
            <b-button  v-on:click="removeWohnung()" variant="danger">Delete</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
          </b-modal>
	</div>

  </div>
</template>

<script>

import axios from 'axios'
import WohnungFrom from './Forms/WohnungForm.vue'
import { apiHost } from '../config/apiHost.js'

export default {
  name: 'UserWohnung',
  components: {
    WohnungFrom
  },
  props: {
    msg: String
  },
  data() {
        return {
            wohnung: {},
            isLoading: true,
            isEdit: true,
            user_edit_data: null
        }
    },
    async created () {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
          this. getOneWohnungen()
    },
    computed: {
    },
    methods:{
      hideModal() {
          this.$bvModal.hide("modal-delete")
      },
      showModal(){
        this.$bvModal.show("modal-delete")
      },
      async getOneWohnungen(){
          try {
              const response = await axios.get(apiHost+'guest/wohnungs/'+this.$route.params.token)
              if( response.data ){
                this.wohnung = response.data.data[0]
              }
                this.isLoading = false

          } catch(e) {
              // handle authentication error here
          }
      },
      async removeWohnung() {
                  this.isLoading = true
                  this.hideModal()
                  try {
                        await axios.delete(apiHost + 'wohnungs/' +this.wohnung.id )
                       // redirect to Home
                       this.$router.push('/')

                  } catch(e) {
                      // handle authentication error here
                      window.console.log(e.response.data.errors)
                  }

      },
      editWohnung() {
        this.isEdit = false
        this.user_edit_data = this.wohnung
        //this.isEdit = true
      },
      updateWohnung(e){
        // this.isLoading = false
        window.console.log(e)
        this.wohnung = e
        this.isEdit = true
      }


    },


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
