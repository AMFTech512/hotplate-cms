<template>
  <div class="comp-list-comp">
      <div class="comp-div" v-for="(component, index) in retVal.components" :key="indicies[index]">
          <component :is="props.compType" :props="props.props" v-model="retVal.components[index]" />
          <div class="del-btn-div">
              <v-btn color="error" @click="delComp(index)">Delete</v-btn>
          </div>
      </div>
      <div class="add-btn-div">
          <v-btn fab color="primary" @click="addComp"><v-icon dark>mdi-plus</v-icon></v-btn>
      </div>

  </div>
</template>

<script>
export default {
    name: 'ComponentList',
    props: {
        props: {
            compType: Object,
            props: Object
        },
        value: {
            type: Object,
            default: () => { return { components: [] } }
        }
    },
    data() {
        return {
            retVal: this.value,
            indicies: (thisRef => {
                let nIndicies = [];
                for(var i in thisRef.value.components)
                    nIndicies.push(i);
                if(nIndicies.length == 0)
                    return [0];
                return nIndicies;
            })(this)
        }
    },
    created() {
        this.updateData();
    },
    methods: {
        updateData() {
            this.$emit('input', this.retVal);
        },
        addComp() {
            this.retVal.components.push({});
            this.indicies.push(this.indicies[this.indicies.length - 1] + 1);
            this.updateData();
        },
        delComp(index) {
            if(!confirm("Are you sure you want to delete this item?"))
                return;
            this.retVal.components.splice(index, 1);
            this.indicies.splice(index, 1);
            this.updateData();
        }
    }
}
</script>

<style lang="scss">

.comp-list-comp {

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