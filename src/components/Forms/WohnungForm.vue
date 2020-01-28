<template>

  <div>
    <b-button v-b-modal.modal-Wohnung>Neu Wohnung</b-button>

    <b-modal id="modal-Wohnung" title="Neu Wohnung">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="Wohnung_email"
            label="Email:"
            label-for="Wohnung_email"
          >
            <b-form-input
              id="Wohnung_email"
              v-model="form.Wohnung['email']"
              type="email"
              required
              placeholder="Email Bitte"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="Wohnung_strasse"
          label="Strasse Namen:"
          label-for="Wohnung_strasse"
          >
            <b-form-input
              id="Wohnung_strasse"
              v-model="form.Wohnung['strasse']"
              required
              placeholder="Strasse Name Bitte"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="Wohnung_ort"
          label="Ort:"
          label-for="Wohnung_ort"
          >
            <b-form-input
              id="Wohnung_ort"
              v-model="form.Wohnung['ort']"
              required
              placeholder="Ort Bitte"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="Wohnung_plz"
          label="Plz:"
          label-for="Wohnung_plz"
          >
            <b-form-input
              id="Wohnung_plz"
              v-model="form.Wohnung['plz']"
              required
              placeholder="Plz Bitte"
            ></b-form-input>
          </b-form-group>


          <b-form-group
          id="Wohnung_land"
          label="Land:"
          label-for="Wohnung_land"
          >
            <b-form-input
              id="Wohnung_land"
              v-model="form.Wohnung['land']"
              required
              placeholder="Land Bitte"
            ></b-form-input>
          </b-form-group>

          <b-form-group
          id="Wohnung_einzugsdatum"
          label="Einzugsdatum:"
          label-for="Wohnung_einzugsdatum"
          >
            <b-form-input
              id="Wohnung_einzugsdatum"
              v-model="form.Wohnung['einzugsdatum']"
              type="date"
              required
              placeholder="Einzugsdatum"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" class="mr-2" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <!-- <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
        -->
    </b-modal>
  </div>
</template>

<script>
import { apiHost } from '../../config/apiHost.js'
import axios from 'axios'
import moment from 'moment'

  export default {
    name: 'WohnungForm',
    props: {
      edit_data: null
    },
    mounted() {
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
          if(this.edit_data && ( modalId.localeCompare("modal-Wohnung") == 0) ){
            this.setForm()
          } else {
            this.clearForm()
          }
          window.console.log('Modal is about to be shown', bvEvent, modalId)
        })
    },
    data() {
      return {
        form: {
          Wohnung: {
            email: '',
            einzugsdatum : '',
            strasse: '',
            ort: '',
            plz:'',
            land:''
          }

        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        this.$bvModal.hide("modal-Wohnung")
        evt.preventDefault()
        this.isLoading = true
        if(this.edit_data){
          this.updateWohnung()
        } else {
          this.postWohnung()
        }
        this.clearForm();
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.clearForm()
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      clearForm(){
        this.form.Wohnung.email = ''
        this.form.Wohnung.strasse = ''
        this.form.Wohnung.ort = ''
        this.form.Wohnung.plz = ''
        this.form.Wohnung.land = ''
        this.form.Wohnung.einzugsdatum = ''
        // clear after setting the data
        // this.edit_data = null
      },
      setForm(){
        this.form.Wohnung.email = this.edit_data.email
        this.form.Wohnung.strasse = this.edit_data.strasse
        this.form.Wohnung.ort = this.edit_data.ort
        this.form.Wohnung.plz = this.edit_data.plz
        this.form.Wohnung.land = this.edit_data.land
        this.form.Wohnung.einzugsdatum = this.backEndDateFormat(this.edit_data.einzugsdatum)
      },
      backEndDateFormat(date){
        return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
      },
      async postWohnung() {
          axios.post(apiHost+'wohnungs', JSON.stringify(this.form.Wohnung) )
              .then(response => {
                  this.$emit('createdWohnungEvent', response.data)
              })
              .catch(error => {
                  // handle authentication and validation errors here
                  this.errors = error.response.data.errors
              })
      },
      async updateWohnung() {
          axios.put(apiHost+'wohnungs/'+this.edit_data.id, JSON.stringify(this.form.Wohnung) )
              .then(response => {
                  this.isLoading = false
                  this.$emit('updatedWohnungEvent', response.data.data)
              })
              .catch(error => {
                  // handle authentication and validation errors here
                  this.errors = error.response.data.errors
                  this.isLoading = false
              })
      }
    }
  }
</script>
