<template>
  <v-list-item class="border">
    <v-list-item-avatar>
      <v-btn icon @click="toggleEdit(tax.id)">
        <v-icon>
          {{ editing ? 'mdi-check' : 'mdi-pencil' }}
        </v-icon>
      </v-btn>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-if="!editing">{{ tax.plural }}</v-list-item-title>
      <v-list-item-title v-else>
        <v-text-field
          v-model="tax.singular"
          label="Singular"
          @keypress="update"
        ></v-text-field>
        <v-text-field
          v-model="tax.plural"
          label="Plural"
          @keypress="update"
        ></v-text-field>
        <v-text-field
          v-model="tax.slug"
          label="Slug"
          @keypress="update"
        ></v-text-field>
      </v-list-item-title>

      <div v-if="editing" class="border">
        <h3>{{ tax.plural }}</h3>

        <v-text-field
          v-model="newval"
          :label="`New ${tax.singular || 'value'}`"
          append-icon="mdi-plus"
          @click:append="addVal"
          @keypress.enter="addVal"
        ></v-text-field>

        <v-chip-group column active-class="secondary--text">
          <v-chip
            v-for="(val, index) in values"
            :key="index"
            close
            color="secondary"
            text-color="sectext"
            @click:close="delVal(index)"
          >
            {{ val }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="$emit('delete', tax.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'TaxonomyComp',
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      editing: false,
      tax: this.value,
      newval: '',
      values: this.value.values
    };
  },
  created() {
    if (!this.tax.slug) {
      this.editing = true;
    }
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
    },
    update() {
      this.tax.values = this.values;
      this.$emit('input', this.tax);
    },
    delVal(index) {
      this.values.splice(index, 1);
      this.update();
    },
    addVal() {
      if (!this.values) {
        this.values = [];
      }
      this.values.push(this.newval);
      this.newval = '';
      this.update();
    }
  }
};
</script>

<style></style>
