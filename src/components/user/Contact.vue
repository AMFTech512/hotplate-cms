<template>
  <div class="contact-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ retVal.name }}</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="retVal.name"
          filled
          label="Full Name"
        ></v-text-field>
        <v-text-field
          v-model="retVal.email"
          filled
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="retVal.phone"
          filled
          label="Phone"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ContactComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {};
      }
    },
    value: {
      type: Object,
      default() {
        return {
          name: 'John Doe',
          email: '',
          phone: ''
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      this.$emit('input', this.retVal);
    }
  }
};
</script>

<style lang="scss">
.contact-comp {
  margin: 40px 0;

  .card {
    // min-width: 400px;
    margin: 0 auto;
  }

  h1 {
    line-height: 2.5rem;
  }
}
</style>
