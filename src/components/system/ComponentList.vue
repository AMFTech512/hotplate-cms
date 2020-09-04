<template>
  <div class="comp-list-comp">
    <v-card class="card">
      <v-card-title>
        <h2>{{ props.headerTxt }}</h2>
      </v-card-title>
      <v-card-text>
        <div
          v-for="(component, index) in retVal.components"
          :key="indices[index]"
          class="comp-div"
        >
          <component
            :is="props.compType"
            v-model="retVal.components[index]"
            :props="props.props"
          />
          <div class="del-btn-div">
            <v-btn color="error" @click="delComp(index)">Delete</v-btn>
          </div>
        </div>
        <div class="add-btn-div">
          <v-btn fab color="primary" @click="addComp"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ComponentList',
  props: {
    props: {
      type: Object,
      default() {
        return {
          compType: Object,
          props: Object,
          headerTxt: 'List'
        };
      }
    },
    value: {
      type: Object,
      default: () => {
        return { components: [] };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      indices: ((thisRef) => {
        const nIndices = [];
        for (const i in thisRef.value.components) {
          nIndices.push(i);
        }
        if (nIndices.length === 0) {
          return [0];
        }
        return nIndices;
      })(this)
    };
  },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      this.$emit('input', this.retVal);
    },
    addComp() {
      this.retVal.components.push(undefined);
      this.indices.push(this.indices[this.indices.length - 1] + 1);
      this.updateData();
    },
    delComp(index) {
      if (!confirm('Are you sure you want to delete this item?')) {
        return;
      }
      this.retVal.components.splice(index, 1);
      this.indices.splice(index, 1);
      if (this.indices.length < 1) {
        this.indices.push(0);
      }
      this.updateData();
    }
  }
};
</script>

<style lang="scss">
.comp-list-comp {
  margin: 10px;

  > h2 {
    margin: 20px;
  }

  .add-btn-div {
    text-align: center;
    margin: 10px;
  }

  .del-btn-div {
    text-align: right;
  }

  .comp-div {
    margin: 10px;
    padding: 10px;
  }
}
</style>
